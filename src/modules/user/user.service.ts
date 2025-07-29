import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ActiveUserDto, UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './user.repository';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { UserTransformer } from './user.transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTransformer: UserTransformer,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.getUserByEmail(createUserDto.email);

    const userCreated = await this.userRepository.createUser(
      createUserDto,
      createUserDto.clinicId,
    );

    return await this.userTransformer.item(userCreated.dataValues);
  }

  async getAllUser({ page, limit }: QueryParamsDto, clinicId: number) {
    const { rows, count } = await this.userRepository.getAllUser(
      {
        limit: limit,
        page: limit! * (page! - 1),
      },
      clinicId,
    );

    return {
      data: await this.userTransformer.collection(rows),
      currentPage: page,
      totalPages: Math.ceil(count / limit!),
    };
  }

  async getMe(email: string) {
    const userFound = await this.userRepository.getUserByEmail(email);

    return await this.userTransformer.item(userFound?.dataValues as User);
  }

  async getUserById(id: number, clinicId: number) {
    const userFound = await this.userRepository.getUserById(id, clinicId);

    if (!userFound)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Usuário não existe',
        true,
      );

    return await this.userTransformer.item(userFound.dataValues);
  }

  public async authenticateUserByEmail(email: string) {
    const userFound = await this.userRepository.getUserByEmail(email);

    if (!userFound)
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Usuário não existe',
        true,
      );

    return userFound;
  }

  private async getUserByEmail(email: string) {
    const userFound = await this.userRepository.getUserByEmail(email);

    if (userFound)
      throw new AppError(
        OperationErrors.CONFLICT,
        HttpStatus.CONFLICT,
        'Usuário já cadastrado',
        true,
      );
  }

  async updateUser(
    updateUserDto: UpdateUserDto | ActiveUserDto,
    id: number,
    clinicId: number,
  ) {
    await this.getUserById(id, clinicId);

    const userUpdated = await this.userRepository.updateUser(
      updateUserDto,
      id,
      clinicId,
    );

    return userUpdated;
  }

  async deleteUser(id: number, clinicId: number) {
    await this.getUserById(id, clinicId);

    return await this.userRepository.deleteUser(id);
  }
}
