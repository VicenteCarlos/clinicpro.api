import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { PatchStatusDto, UpdateExamDto } from './dtos/update-exam.dto';
import { ExamRepository } from './exam.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { ExamTransformer } from './exam.transformer';
import { QueryParamsDto } from './dtos/query-params.dto';

@Injectable()
export class ExamService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly examTransformer: ExamTransformer,
  ) {}

  async createExam(createExamDto: CreateExamDto, clinicId: number) {
    const examCreated = await this.examRepository.createExam(
      createExamDto,
      clinicId,
    );

    return await this.examTransformer.item(examCreated.dataValues);
  }

  async getAllExam({ page, limit, name }: QueryParamsDto, clinicId: number) {
    const { rows, count } = await this.examRepository.getAllExam(
      {
        limit: limit,
        page: limit! * (page! - 1),
        name,
      },
      clinicId,
    );

    return {
      data: await this.examTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async patchStatus(
    patchStatusDto: PatchStatusDto,
    id: number,
    clinicId: number,
  ) {
    await this.getExamById(id, clinicId);

    const examUpdated = await this.examRepository.updateExam(
      patchStatusDto,
      id,
      clinicId,
    );

    return examUpdated;
  }

  async getExamById(id: number, clinicId: number) {
    const examFound = await this.examRepository.getExamById(id, clinicId);

    if (!examFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Exame não existe',
        true,
      );

    return await this.examTransformer.item(examFound.dataValues);
  }

  async updateExam(updateExamDto: UpdateExamDto, id: number, clinicId: number) {
    await this.getExamById(id, clinicId);

    const examUpdated = await this.examRepository.updateExam(
      updateExamDto,
      id,
      clinicId,
    );

    return examUpdated;
  }

  async deleteExam(id: number, clinicId: number) {
    await this.getExamById(id, clinicId);

    return await this.examRepository.deleteExam(id);
  }
}
