import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ActiveUserDto, UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(createUserDto: CreateUserDto, clinicId: number) {
    return await this.userModel.create({
      ...createUserDto,
      clinicId,
    } as User);
  }

  async getAllUser(
    queryParams: QueryParamsDto,
    clinicId: number,
    filter?: object,
  ) {
    const { rows, count } = await this.userModel.findAndCountAll({
      where: {
        clinicId,
        isActive: true,
        ...filter,
      },
      limit: queryParams.limit,
      offset: queryParams.page,
    });

    return { rows, count };
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async getUserById(id: number, clinicId: number) {
    return await this.userModel.findOne({
      where: {
        id,
        clinicId,
        isActive: true,
      },
    });
  }

  async updateUser(
    updateUserDto: UpdateUserDto | ActiveUserDto,
    id: number,
    clinicId: number,
  ) {
    return await this.userModel.update(updateUserDto, {
      where: {
        id,
        clinicId,
      },
    });
  }

  async deleteUser(id: number) {
    return await this.userModel.destroy({
      where: { id },
    });
  }
}
