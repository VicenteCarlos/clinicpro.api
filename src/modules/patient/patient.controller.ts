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
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { PatientService } from './patient.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  public async createPatient(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    const data = await this.patientService.createPatient(
      createPatientDto,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  public async getAllPatients(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10, full_name }: QueryParamsDto,
  ) {
    const data = await this.patientService.getAllPatient(
      { page: +page, limit: +limit, full_name },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getPatientById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.patientService.getPatientById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updatePatient(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const data = await this.patientService.updatePatient(
      updatePatientDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deletePatient(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.patientService.deletePatient(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
}
