import { Injectable } from '@nestjs/common';
import { Clinic } from './clinic.entity';
import { InjectModel } from '@nestjs/sequelize';
import { QueryParamsDto } from './dtos/query-params.dto';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ClinicRepository {
  constructor(
    @InjectModel(Clinic) private readonly clinicModel: typeof Clinic,
  ) {}

  async getAllClinic(queryParams: QueryParamsDto, filter?: object) {
    const { rows, count } = await this.clinicModel.findAndCountAll({
      where: filter as WhereOptions<Clinic>,
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async getClinicById(id: number) {
    return await this.clinicModel.findOne({
      where: {
        id,
      },
    });
  }
}
