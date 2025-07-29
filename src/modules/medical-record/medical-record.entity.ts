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
import { Patient } from '../patient/patient.entity';
import { Professional } from '../professional/professional.entity';
import { Query } from '../queries/query.entity';

@Table({ tableName: 'medical_records' })
export class MedicalRecord extends Model<MedicalRecord> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare public id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public patient_id: number;

  @BelongsTo(() => Patient)
  public patient: Patient;

  @ForeignKey(() => Professional)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public professional_id: number;

  @BelongsTo(() => Professional)
  public professional: Professional;

  @ForeignKey(() => Query)
  @Column({ type: DataType.INTEGER })
  public appointment_id: number;

  @BelongsTo(() => Query)
  public appointment: Query;

  @Column({ type: DataType.DATE, allowNull: false })
  public record_date: Date;

  @Column({
    type: DataType.ENUM(
      'consultation',
      'exam',
      'procedure',
      'prescription',
      'emergency',
    ),
    allowNull: false,
  })
  public record_type: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public specialty: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  public chief_complaint: string;

  @Column({ type: DataType.TEXT })
  public history_of_present_illness: string;

  @Column({ type: DataType.TEXT })
  public physical_examination: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  public diagnosis: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  public treatment: string;

  @Column({ type: DataType.TEXT })
  public follow_up: string;

  @Column({ type: DataType.TEXT })
  public notes: string;

  @Column({ type: DataType.JSON })
  public attachments: string[];

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
