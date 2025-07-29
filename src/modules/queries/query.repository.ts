import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQueryDto } from './dtos/create-query.dto';
import { UpdateQueryDto } from './dtos/update-query.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { Patient } from '../patient/patient.entity';
import { Professional } from '../professional/professional.entity';
import { Query } from './query.entity';

@Injectable()
export class QueryRepository {
  constructor(
    @InjectModel(Query)
    private readonly queryModel: typeof Query,
  ) {}

  async createQuery(dto: CreateQueryDto, clinicId: number) {
    return await this.queryModel.create({ ...dto, clinicId } as Query);
  }

  async getAllQuery({ limit, page }: QueryParamsDto, clinicId: number) {
    const { rows, count } = await this.queryModel.findAndCountAll({
      where: { clinicId },
      limit,
      offset: page,
      include: [
        {
          model: Patient,
          attributes: { exclude: ['clinicId', 'createdAt', 'updatedAt'] },
        },
        {
          model: Professional,
          attributes: { exclude: ['clinicId', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    return { rows, count };
  }

  async getQueryById(id: number, clinicId: number) {
    return await this.queryModel.findOne({
      where: { id, clinicId },
      include: [
        {
          model: Patient,
          attributes: { exclude: ['clinicId', 'createdAt', 'updatedAt'] },
        },
        {
          model: Professional,
          attributes: { exclude: ['clinicId', 'createdAt', 'updatedAt'] },
        },
      ],
    });
  }

  async updateQuery(dto: UpdateQueryDto, id: number, clinicId: number) {
    return await this.queryModel.update(dto, {
      where: { id, clinicId },
    });
  }

  async patchStatusQuery(id: number, clinicId: number, status: string) {
  return await this.queryModel.update(
    { status },
    {
      where: {
        id,
        clinicId,
      },
    },
  );
}


  async deleteQuery(id: number) {
    return await this.queryModel.destroy({ where: { id } });
  }
}
