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

import { QueryParamsDto } from './dtos/query-params.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dtos/create-query.dto';
import { PatchStatusQuery, UpdateQueryDto } from './dtos/update-query.dto';

@UseGuards(AuthGuard)
@Controller('/queries')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  public async createQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: CreateQueryDto,
  ) {
    const data = await this.queryService.createQuery(
      dto,
      +req['user']['clinicId'],
    );
    res.status(HttpStatus.CREATED).json({ data });
  }

  @Patch(':id')
  public async patchStatusQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Body() patchStatusQueryDto: PatchStatusQuery,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.queryService.patchStatusQuery(
      patchStatusQueryDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Get()
  public async getAllQueries(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10 }: QueryParamsDto,
  ) {
    const data = await this.queryService.getAllQuery(
      { page: +page, limit: +limit },
      +req['user']['clinicId'],
    );
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getQueryById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.queryService.getQueryById(
      id,
      +req['user']['clinicId'],
    );
    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  public async updateQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQueryDto,
  ) {
    const data = await this.queryService.updateQuery(
      dto,
      id,
      +req['user']['clinicId'],
    );
    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  public async deleteQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.queryService.deleteQuery(
      id,
      +req['user']['clinicId'],
    );
    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
}
