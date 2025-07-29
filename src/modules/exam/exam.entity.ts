import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Patient } from '../patient/patient.entity';
import { Clinic } from '../clinic/clinic.entity';
import { Professional } from '../professional/professional.entity';

interface ExamResult {
  parameter: string;
  value: string;
  unit?: string;
  reference?: string;
  status?: 'normal' | 'altered' | 'critical';
  notes?: string;
}

@Table({
  tableName: 'exams',
})
export class Exam extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'exam_name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'exam_type',
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'request_date',
  })
  requestDate: Date;

  @Column({
    type: DataType.TEXT,
  })
  observations: string;

  @Column({
    type: DataType.JSONB,
    defaultValue: [],
  })
  results: ExamResult[];

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
  })
  status: string;

  @Column({
    type: DataType.TEXT,
  })
  notes: string;

  @ForeignKey(() => Professional)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  professionalId: number;

  @BelongsTo(() => Professional)
  professional: Professional;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clinicId: number;

  @BelongsTo(() => Clinic)
  clinic: Clinic;
} 