import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dtos/create-query.dto';
import { PatchStatusQuery, UpdateQueryDto } from './dtos/update-query.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { QueryRepository } from './query.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { QueryTransformer } from './query.transformer';
import { PatientService } from '../patient/patient.service';
import { ProfessionalService } from '../professional/professional.service';

@Injectable()
export class QueryService {
  constructor(
    private readonly queryRepository: QueryRepository,
    private readonly queryTransformer: QueryTransformer,
    private readonly patientService: PatientService,
    private readonly professionalService: ProfessionalService,
  ) {}

  async createQuery(dto: CreateQueryDto, clinicId: number) {
    await this.patientService.getPatientById(dto.patient_id, clinicId);
    await this.professionalService.getProfessionalById(
      dto.professional_id,
      clinicId,
    );

    const created = await this.queryRepository.createQuery(dto, clinicId);
    return await this.queryTransformer.createItem(created.dataValues);
  }

  async getAllQuery({ limit, page }: QueryParamsDto, clinicId: number) {
    const { rows, count } = await this.queryRepository.getAllQuery(
      {
        limit: limit,
        page: limit! * (page! - 1),
      },
      clinicId,
    );

    return {
      data: await this.queryTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getQueryById(id: number, clinicId: number) {
    const found = await this.queryRepository.getQueryById(id, clinicId);

    if (!found)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Consulta não encontrada',
        true,
      );

    return await this.queryTransformer.item(found.dataValues);
  }

  async patchStatusQuery(
    patchStatusDto: PatchStatusQuery,
    id: number,
    clinicId: number,
  ) {
    await this.getQueryById(id, clinicId);

    const updated = await this.queryRepository.patchStatusQuery(
      id,
      clinicId,
      patchStatusDto.status,
    );

    return updated;
  }

  async updateQuery(dto: UpdateQueryDto, id: number, clinicId: number) {
    await this.getQueryById(id, clinicId);
    return await this.queryRepository.updateQuery(dto, id, clinicId);
  }

  async deleteQuery(id: number, clinicId: number) {
    await this.getQueryById(id, clinicId);
    return await this.queryRepository.deleteQuery(id);
  }
}
