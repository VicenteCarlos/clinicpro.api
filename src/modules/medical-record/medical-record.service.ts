import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';
import { MedicalRecordRepository } from './medical-record.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { MedicalRecordTransformer } from './medical-record.transformer';

@Injectable()
export class MedicalRecordService {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
    private readonly medicalRecordTransformer: MedicalRecordTransformer,
  ) {}

  async createMedicalRecord(
    createMedicalRecordDto: CreateMedicalRecordDto,
    clinicId: number,
  ) {
    const medicalRecordCreated =
      await this.medicalRecordRepository.createMedicalRecord(
        createMedicalRecordDto,
        clinicId,
      );

    return await this.medicalRecordTransformer.item(
      medicalRecordCreated.dataValues,
    );
  }

  async getAllMedicalRecord(
    { page, limit, specialty }: QueryParamsDto,
    clinicId: number,
  ) {
    const { rows, count } =
      await this.medicalRecordRepository.getAllMedicalRecord(
        {
          limit: limit,
          page: limit! * (page! - 1),
          specialty,
        },
        clinicId,
      );

    return {
      data: await this.medicalRecordTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getMedicalRecordById(id: number, clinicId: number) {
    const medicalRecordFound =
      await this.medicalRecordRepository.getMedicalRecordById(id, clinicId);

    if (!medicalRecordFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Prontuário não existe',
        true,
      );

    return await this.medicalRecordTransformer.item(
      medicalRecordFound.dataValues,
    );
  }

  async updateMedicalRecord(
    updateMedicalRecordDto: UpdateMedicalRecordDto,
    id: number,
    clinicId: number,
  ) {
    await this.getMedicalRecordById(id, clinicId);

    const MedicalRecordUpdated =
      await this.medicalRecordRepository.updateMedicalRecord(
        updateMedicalRecordDto,
        id,
        clinicId,
      );

    return MedicalRecordUpdated;
  }

  async deleteMedicalRecord(id: number, clinicId: number) {
    await this.getMedicalRecordById(id, clinicId);

    return await this.medicalRecordRepository.deleteMedicalRecord(id);
  }
}
