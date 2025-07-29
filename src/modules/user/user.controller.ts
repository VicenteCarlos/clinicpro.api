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
import { CreateUserDto } from './dtos/create-user.dto';
import { ActiveUserDto, UpdateUserDto } from './dtos/update-user.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { HashPipe } from 'src/common/pipes/hashPassword';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body(HashPipe) createUserDto: CreateUserDto,
  ) {
    const data = await this.userService.createUser(createUserDto);

    res.status(HttpStatus.CREATED).json({ data });
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  public async getMe(@Req() req: Request, @Res() res: Response) {
    const data = await this.userService.getMe(req['user']['email']);

    res.status(HttpStatus.OK).json({ data });
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getAllUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10 }: QueryParamsDto,
  ) {
    const data = await this.userService.getAllUser(
      { page: +page, limit: +limit },
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json(data);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getUserById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.userService.getUserById(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public async updateUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.userService.updateUser(
      updateUserDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  public async activeUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() activeUserDto: ActiveUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.userService.updateUser(
      activeUserDto,
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.userService.deleteUser(
      id,
      +req['user']['clinicId'],
    );

    res.status(HttpStatus.NO_CONTENT).json({ data });
  }
}
