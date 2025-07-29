import { HttpStatus, Injectable } from '@nestjs/common';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ClinicRepository } from './clinic.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { ClinicTransformer } from './clinic.transformer';

@Injectable()
export class ClinicService {
  constructor(
    private readonly clinicRepository: ClinicRepository,
    private readonly clinicTransformer: ClinicTransformer,
  ) {}

  async getAllClinic({ page, limit }: QueryParamsDto) {
    const { rows, count } = await this.clinicRepository.getAllClinic({
      limit: limit,
      page: limit! * (page! - 1),
    });

    return {
      data: await this.clinicTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getClinicById(id: number) {
    const ClinicFound = await this.clinicRepository.getClinicById(id);

    if (!ClinicFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Clínica não existe',
        true,
      );

    return await this.clinicTransformer.item(ClinicFound.dataValues);
  }
}
