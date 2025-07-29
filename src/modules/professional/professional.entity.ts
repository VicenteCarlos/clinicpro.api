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

@Table({ tableName: 'professionals' })
export class Professional extends Model<Professional> {
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

  @Column({ type: DataType.STRING(50), allowNull: false })
  public crm: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public specialty: string;

  @ForeignKey(() => Clinic)
  @Column({ field: 'clinicId', type: DataType.INTEGER, allowNull: false })
  public clinicId: number;

  @BelongsTo(() => Clinic)
  public clinic: Clinic;

  @Column({ type: DataType.JSONB, allowNull: true })
  public working_hours: any;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  declare public createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare public updatedAt: Date;
}
