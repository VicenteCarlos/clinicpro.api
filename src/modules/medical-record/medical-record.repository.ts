import { Injectable } from '@nestjs/common';
import { MedicalRecord } from './medical-record.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';
import { Op } from 'sequelize';

@Injectable()
export class MedicalRecordRepository {
  constructor(
    @InjectModel(MedicalRecord)
    private readonly medicalRecordModel: typeof MedicalRecord,
  ) {}

  async createMedicalRecord(
    createMedicalRecordDto: CreateMedicalRecordDto,
    clinicId: number,
  ) {
    return await this.medicalRecordModel.create({
      ...createMedicalRecordDto,
      clinicId,
    } as MedicalRecord);
  }

  async getAllMedicalRecord(
    { specialty, ...queryParams }: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.medicalRecordModel.findAndCountAll({
      where: {
        clinicId,
        ...filter,
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    console.log(rows);

    return { rows, count };
  }

  async getMedicalRecordById(id: number, clinicId: number) {
    return await this.medicalRecordModel.findOne({
      where: {
        id,
        clinicId,
      },
    });
  }

  async updateMedicalRecord(
    updateMedicalRecordDto: UpdateMedicalRecordDto,
    id: number,
    clinicId: number,
  ) {
    return await this.medicalRecordModel.update(updateMedicalRecordDto, {
      where: {
        id,
        clinicId,
      },
    });
  }

  async deleteMedicalRecord(id: number) {
    return await this.medicalRecordModel.destroy({
      where: { id },
    });
  }
}
