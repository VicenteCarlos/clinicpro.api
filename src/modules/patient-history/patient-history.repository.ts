import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PatientHistory } from './patient-history.entity';
import { CreatePatientHistoryDto } from './dtos/create-patient-history.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UpdatePatientHistoryDto } from './dtos/update-patient-history.dto';
import { Op } from 'sequelize';

@Injectable()
export class PatientHistoryRepository {
  constructor(
    @InjectModel(PatientHistory)
    private readonly patientHistoryModel: typeof PatientHistory,
  ) {}

  async create(
    createPatientHistoryDto: CreatePatientHistoryDto,
    clinicId: number,
  ) {
    return await this.patientHistoryModel.create({
      ...createPatientHistoryDto,
      clinicId,
    });
  }

  async findAll(
    { recordType, ...queryParams }: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.patientHistoryModel.findAndCountAll({
      where: {
        clinicId,
        ...filter,
        ...(recordType && {
          recordType: {
            [Op.iLike]: `%${recordType}%`,
          },
        }),
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async findOne(id: number, clinicId: number) {
    return await this.patientHistoryModel.findOne({
      where: {
        id,
        clinicId,
      },
    });
  }

  async update(
    updatePatientHistoryDto: UpdatePatientHistoryDto,
    id: number,
    clinicId: number,
  ) {
    const [, [updated]] = await this.patientHistoryModel.update(
      updatePatientHistoryDto,
      {
        where: {
          id,
          clinicId,
        },
        returning: true,
      },
    );

    return updated;
  }

  async delete(id: number) {
    return await this.patientHistoryModel.destroy({
      where: { id },
    });
  }
}
