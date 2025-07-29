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
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { MedicalRecordService } from './medical-record.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/medical-records')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  public async createMedicalRecord(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
  ) {
    const data = await this.medicalRecordService.createMedicalRecord(
      createMedicalRecordDto,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  public async getAllMedicalRecords(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10, specialty }: QueryParamsDto,
  ) {
    const data = await this.medicalRecordService.getAllMedicalRecord(
      { page: +page, limit: +limit, specialty },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getMedicalRecordById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.medicalRecordService.getMedicalRecordById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updateMedicalRecord(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    const data = await this.medicalRecordService.updateMedicalRecord(
      updateMedicalRecordDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deleteMedicalRecord(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.medicalRecordService.deleteMedicalRecord(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
}
