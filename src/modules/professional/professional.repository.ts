import { Injectable } from '@nestjs/common';
import { Professional } from './professional.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { QueryParamsDto } from './dtos/query-params.dto';

@Injectable()
export class ProfessionalRepository {
  constructor(
    @InjectModel(Professional)
    private readonly professionalModel: typeof Professional,
  ) {}

  async createProfessional(
    createProfessionalDto: CreateProfessionalDto,
    clinicId: number,
  ) {
    return await this.professionalModel.create({
      ...createProfessionalDto,
      clinicId,
    } as Professional);
  }

  async getAllProfessional(
    queryParams: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.professionalModel.findAndCountAll({
      where: {
        clinicId,
        ...filter,
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async getProfessionalById(id: number, clinicId: number) {
    return await this.professionalModel.findOne({
      where: {
        id,
        clinicId,
      },
    });
  }

  async updateProfessional(
    updateProfessionalDto: UpdateProfessionalDto,
    id: number,
    clinicId: number,
  ) {
    return await this.professionalModel.update(updateProfessionalDto, {
      where: {
        id,
        clinicId,
      },
    });
  }

  async deleteProfessional(id: number) {
    return await this.professionalModel.destroy({
      where: { id },
    });
  }
}
