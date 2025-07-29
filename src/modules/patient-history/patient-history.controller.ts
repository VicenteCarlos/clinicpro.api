import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePatientHistoryDto } from './dtos/create-patient-history.dto';
import { UpdatePatientHistoryDto } from './dtos/update-patient-history.dto';
import { PatientHistoryService } from './patient-history.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { QueryParamsDto } from './dtos/query-params.dto';

@UseGuards(AuthGuard)
@Controller('/patient-histories')
export class PatientHistoryController {
  constructor(private readonly patientHistoryService: PatientHistoryService) {}

  @Post()
  public async createPatientHistory(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPatientHistoryDto: CreatePatientHistoryDto,
  ) {
    const data = await this.patientHistoryService.createHistory(
      createPatientHistoryDto,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  public async getAllPatientHistories(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10, recordType }: QueryParamsDto,
  ) {
    const data = await this.patientHistoryService.getAllHistory(
      { page: +page, limit: +limit, recordType },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getPatientHistoryById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.patientHistoryService.getHistoryById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updatePatientHistory(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientHistoryDto: UpdatePatientHistoryDto,
  ) {
    const data = await this.patientHistoryService.updateHistory(
      updatePatientHistoryDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deletePatientHistory(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.patientHistoryService.deleteHistory(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
} 