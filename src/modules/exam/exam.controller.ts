import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateExamDto } from './dtos/create-exam.dto';
import { PatchStatusDto, UpdateExamDto } from './dtos/update-exam.dto';
import { ExamService } from './exam.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { QueryParamsDto } from './dtos/query-params.dto';

@UseGuards(AuthGuard)
@Controller('/exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  public async createExam(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createExamDto: CreateExamDto,
  ) {
    const data = await this.examService.createExam(
      createExamDto,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  public async getAllExams(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10, name }: QueryParamsDto,
  ) {
    const data = await this.examService.getAllExam(
      { page: +page, limit: +limit, name },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getExamById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.examService.getExamById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Patch(':id')
  public async patchStatus(
    @Req() req: Request,
    @Res() res: Response,
    @Body() patchStatusDto: PatchStatusDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.examService.patchStatus(
      patchStatusDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updateExam(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    const data = await this.examService.updateExam(
      updateExamDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deleteExam(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.examService.deleteExam(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
} 