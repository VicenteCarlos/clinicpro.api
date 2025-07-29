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
import { Query } from '../queries/query.entity';

@Table({
  tableName: 'patient_histories',
})
export class PatientHistory extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'record_date',
  })
  recordDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'record_type',
  })
  recordType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  specialty: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'main_complaint',
  })
  mainComplaint: string;

  @Column({
    type: DataType.TEXT,
    field: 'current_disease_history',
  })
  currentDiseaseHistory: string;

  @Column({
    type: DataType.TEXT,
    field: 'physical_exam',
  })
  physicalExam: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  diagnosis: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  treatment: string;

  @Column({
    type: DataType.TEXT,
    field: 'follow_up',
  })
  followUp: string;

  @Column({
    type: DataType.TEXT,
  })
  observations: string;

  @ForeignKey(() => Query)
  @Column({
    type: DataType.INTEGER,
  })
  queryId: number;

  @BelongsTo(() => Query)
  query: Query;

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