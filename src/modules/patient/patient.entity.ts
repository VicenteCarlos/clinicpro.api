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

@Table({ tableName: 'patients' })
export class Patient extends Model<Patient> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare public id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  public full_name: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataType.STRING(20) })
  public phone: string;

  @Column({ type: DataType.STRING(14), allowNull: false, unique: true })
  public cpf: string;

  @Column({ type: DataType.DATEONLY })
  public birth_date: Date;

  @Column({ type: DataType.STRING(255) })
  public street: string;

  @Column({ type: DataType.STRING(10) })
  public number: string;

  @Column({ type: DataType.STRING(100) })
  public city: string;

  @Column({ type: DataType.STRING(2) })
  public state: string;

  @Column({ type: DataType.STRING(9) })
  public zip_code: string;

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
