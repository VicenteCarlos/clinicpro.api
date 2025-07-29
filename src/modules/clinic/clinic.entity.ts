// src/modules/clinics/entities/clinic.model.ts

import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({ tableName: 'clinics' })
export class Clinic extends Model<Clinic> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public email: string;

  @Column(DataType.STRING)
  public address: string;

  @Column(DataType.STRING)
  public phone: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare public createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare public updatedAt: Date;

  @HasMany(() => User)
  public users: User[];
}
