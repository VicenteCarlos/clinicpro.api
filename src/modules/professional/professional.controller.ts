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
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ProfessionalService } from './professional.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/professionals')
export class ProfessionalController {
  constructor(
    private readonly professionalService: ProfessionalService,
  ) {}

  @Post()
  public async createProfessional(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createProfessionalDto: CreateProfessionalDto,
  ) {
    const data = await this.professionalService.createProfessional(
      createProfessionalDto,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  public async getAllProfessionals(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10 }: QueryParamsDto,
  ) {
    const data = await this.professionalService.getAllProfessional(
      { page: +page, limit: +limit },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getProfessionalById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.professionalService.getProfessionalById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updateProfessional(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ) {
    const data = await this.professionalService.updateProfessional(
      updateProfessionalDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deleteProfessional(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.professionalService.deleteProfessional(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
}
