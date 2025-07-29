import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { ClinicModule } from './modules/clinic/clinic.module';
import { AuthModule } from './modules/auth/auth.module';
import { PatientModule } from './modules/patient/patient.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { QueryModule } from './modules/queries/query.module';
import { ExamModule } from './modules/exam/exam.module';
import { PatientHistoryModule } from './modules/patient-history/patient-history.module';
import { MedicalRecordModule } from './modules/medical-record/medical-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`,
        },
      }),
    }),
    UserModule,
    ClinicModule,
    AuthModule,
    PatientModule,
    ProfessionalModule,
    QueryModule,
    ExamModule,
    PatientHistoryModule,
    MedicalRecordModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
