import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Clinic } from '../clinic/clinic.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare public id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  public isActive: boolean;

  @ForeignKey(() => Clinic)
  @Column(DataType.INTEGER)
  public clinicId: number;

  @BelongsTo(() => Clinic)
  public clinic: Clinic;

  @CreatedAt
  @Column(DataType.DATE)
  declare public createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare public updatedAt: Date;
}
