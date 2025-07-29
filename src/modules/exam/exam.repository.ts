import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Exam } from './exam.entity';
import { CreateExamDto } from './dtos/create-exam.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { PatchStatusDto, UpdateExamDto } from './dtos/update-exam.dto';
import { Op } from 'sequelize';

@Injectable()
export class ExamRepository {
  constructor(
    @InjectModel(Exam) private readonly examModel: typeof Exam,
  ) {}

  async createExam(createExamDto: CreateExamDto, clinicId: number) {
    return await this.examModel.create({
      ...createExamDto,
      clinicId,
    } );
  }

  async getAllExam(
    { name, ...queryParams }: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.examModel.findAndCountAll({
      where: {
        clinicId,
        ...filter,
        ...(name && {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }),
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async getExamById(id: number, clinicId: number) {
    return await this.examModel.findOne({
      where: {
        id,
        clinicId,
      },
    });
  }

  async updateExam(
    updateExamDto: UpdateExamDto | PatchStatusDto,
    id: number,
    clinicId: number,
  ) {
    return await this.examModel.update(updateExamDto, {
      where: {
        id,
        clinicId,
      },
    });
  }

  async deleteExam(id: number) {
    return await this.examModel.destroy({
      where: { id },
    });
  }
}
