import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ClinicService } from './clinic.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  public async getAllClinics(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10 }: QueryParamsDto,
  ) {
    const data = await this.clinicService.getAllClinic({ page, limit });

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getClinicById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.clinicService.getClinicById(id);

    res.status(HttpStatus.OK).json({ data });
  }
}
