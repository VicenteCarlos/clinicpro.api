import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ProfessionalRepository } from './professional.repository';
import { ProfessionalTransformer } from './professional.transformer';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';

@Injectable()
export class ProfessionalService {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
    private readonly professionalTransformer: ProfessionalTransformer,
  ) {}

  async createProfessional(
    createProfessionalDto: CreateProfessionalDto,
    clinicId: number,
  ) {
    const professionalCreated =
      await this.professionalRepository.createProfessional(
        createProfessionalDto,
        clinicId,
      );

    return await this.professionalTransformer.item(
      professionalCreated.dataValues,
    );
  }

  async getAllProfessional(
    { page, limit }: QueryParamsDto,
    clinicId: number,
  ) {
    const { rows, count } =
      await this.professionalRepository.getAllProfessional(
        {
          limit: limit,
          page: limit! * (page! - 1),
        },
        clinicId,
      );

    return {
      data: await this.professionalTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getProfessionalById(id: number, clinicId: number) {
    const professionalFound =
      await this.professionalRepository.getProfessionalById(id, clinicId);

    if (!professionalFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Profissional não existe',
        true,
      );

    return await this.professionalTransformer.item(
      professionalFound.dataValues,
    );
  }

  async updateProfessional(
    updateProfessionalDto: UpdateProfessionalDto,
    id: number,
    clinicId: number,
  ) {
    await this.getProfessionalById(id, clinicId);

    return await this.professionalRepository.updateProfessional(
      updateProfessionalDto,
      id,
      clinicId,
    );
  }

  async deleteProfessional(id: number, clinicId: number) {
    await this.getProfessionalById(id, clinicId);

    return await this.professionalRepository.deleteProfessional(id);
  }
}
