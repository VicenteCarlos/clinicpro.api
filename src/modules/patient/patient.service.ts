import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PatientRepository } from './patient.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { PatientTransformer } from './patient.transformer';

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientTransformer: PatientTransformer,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto, clinicId: number) {
    await this.gePatientByEmail(createPatientDto.email)

    const patientCreated = await this.patientRepository.createPatient(
      createPatientDto,
      clinicId,
    );

    return await this.patientTransformer.item(patientCreated.dataValues);
  }

  async getAllPatient({ page, limit, full_name }: QueryParamsDto, clinicId: number) {
    const { rows, count } = await this.patientRepository.getAllPatient(
      {
        limit: limit,
        page: limit! * (page! - 1),
        full_name
      },
      clinicId,
    );

    return {
      data: await this.patientTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  private async gePatientByEmail(email: string) {
    const patientFound = await this.patientRepository.gePatientByEmail(email);

    if (patientFound)
      throw new AppError(
        OperationErrors.CONFLICT,
        HttpStatus.CONFLICT,
        'Paciente já cadastrado',
        true,
      );
  }

  async getPatientById(id: number, clinicId: number) {
    const patientFound = await this.patientRepository.getPatientById(
      id,
      clinicId,
    );

    if (!patientFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Paciente não existe',
        true,
      );

    return await this.patientTransformer.item(patientFound.dataValues);
  }

  async updatePatient(
    updatePatientDto: UpdatePatientDto,
    id: number,
    clinicId: number,
  ) {
    await this.getPatientById(id, clinicId);

    const PatientUpdated = await this.patientRepository.updatePatient(
      updatePatientDto,
      id,
      clinicId,
    );

    return PatientUpdated;
  }

  async deletePatient(id: number, clinicId: number) {
    await this.getPatientById(id, clinicId);

    return await this.patientRepository.deletePatient(id);
  }
}
