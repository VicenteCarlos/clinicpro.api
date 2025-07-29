import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientHistoryDto } from './dtos/create-patient-history.dto';
import { UpdatePatientHistoryDto } from './dtos/update-patient-history.dto';
import { PatientHistoryRepository } from './patient-history.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { PatientHistoryTransformer } from './patient-history.transformer';
import { QueryParamsDto } from './dtos/query-params.dto';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class PatientHistoryService {
  constructor(
    private readonly patientHistoryRepository: PatientHistoryRepository,
    private readonly patientHistoryTransformer: PatientHistoryTransformer,
    private readonly patientService: PatientService,
  ) {}

  async createHistory(
    createPatientHistoryDto: CreatePatientHistoryDto,
    clinicId: number,
  ) {
    await this.patientService.getPatientById(
      createPatientHistoryDto.patientId,
      clinicId,
    );

    const historyCreated = await this.patientHistoryRepository.create(
      createPatientHistoryDto,
      clinicId,
    );

    return await this.patientHistoryTransformer.item(historyCreated.dataValues);
  }

  async getAllHistory(
    { page, limit, recordType }: QueryParamsDto,
    clinicId: number,
  ) {
    const { rows, count } = await this.patientHistoryRepository.findAll(
      {
        limit: limit,
        page: limit! * (page! - 1),
        recordType,
      },
      clinicId,
    );

    return {
      data: await this.patientHistoryTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getHistoryById(id: number, clinicId: number) {
    const historyFound = await this.patientHistoryRepository.findOne(
      id,
      clinicId,
    );

    if (!historyFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Histórico não existe',
        true,
      );

    return await this.patientHistoryTransformer.item(historyFound.dataValues);
  }

  async updateHistory(
    updatePatientHistoryDto: UpdatePatientHistoryDto,
    id: number,
    clinicId: number,
  ) {
    await this.getHistoryById(id, clinicId);

    if (updatePatientHistoryDto.patientId) {
      await this.patientService.getPatientById(
        updatePatientHistoryDto.patientId,
        clinicId,
      );
    }

    const historyUpdated = await this.patientHistoryRepository.update(
      updatePatientHistoryDto,
      id,
      clinicId,
    );

    return historyUpdated;
  }

  async deleteHistory(id: number, clinicId: number) {
    await this.getHistoryById(id, clinicId);

    return await this.patientHistoryRepository.delete(id);
  }
}
