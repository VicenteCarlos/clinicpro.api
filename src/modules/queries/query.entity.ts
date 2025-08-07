import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Clinic } from '../clinic/clinic.entity';
import { Patient } from '../patient/patient.entity';
import { Professional } from '../professional/professional.entity';

@Table({ tableName: 'queries' })
export class Query extends Model<Query> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare public id: number;

  @ForeignKey(() => Patient)
  @Column(DataType.INTEGER)
  public patient_id: number;

  @BelongsTo(() => Patient)
  public patient: Patient;

  @ForeignKey(() => Professional)
  @Column(DataType.INTEGER)
  public professional_id: number;

  @BelongsTo(() => Professional)
  public professional: Professional;

  @ForeignKey(() => Clinic)
  @Column({ field: 'clinicId', type: DataType.INTEGER })
  public clinicId: number;

  @BelongsTo(() => Clinic)
  public clinic: Clinic;

  @Column(DataType.DATEONLY)
  public date: string;

  @Column(DataType.TIME)
  public time: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'aguardando',
  })
  public status: string;

  @Column(DataType.STRING(100))
  public specialty: string;

  @Column(DataType.TEXT)
  public notes: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare public createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare public updatedAt: Date;
}
