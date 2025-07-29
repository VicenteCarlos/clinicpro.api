import { Injectable } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { Op } from 'sequelize';

@Injectable()
export class PatientRepository {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto, clinicId: number) {
    return await this.patientModel.create({
      ...createPatientDto,
      clinicId,
    } as Patient);
  }

  async getAllPatient(
    { full_name, ...queryParams }: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.patientModel.findAndCountAll({
      where: {
        clinicId,
        ...filter,
        full_name: {
          [Op.iLike]: `%${full_name}%`,
        },
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async gePatientByEmail(email: string) {
    return await this.patientModel.findOne({
      where: { email },
    });
  }

  async getPatientById(id: number, clinicId: number) {
    return await this.patientModel.findOne({
      where: {
        id,
        clinicId,
      },
    });
  }

  async updatePatient(
    updatePatientDto: UpdatePatientDto,
    id: number,
    clinicId: number,
  ) {
    return await this.patientModel.update(updatePatientDto, {
      where: {
        id,
        clinicId,
      },
    });
  }

  async deletePatient(id: number) {
    return await this.patientModel.destroy({
      where: { id },
    });
  }
}
