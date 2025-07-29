import { Injectable } from '@nestjs/common';
import { PatientHistory } from './patient-history.entity';

@Injectable()
export class PatientHistoryTransformer {
  async item(history: PatientHistory) {
    return {
      id: history.id,
      recordDate: history.recordDate,
      recordType: history.recordType,
      specialty: history.specialty,
      mainComplaint: history.mainComplaint,
      currentDiseaseHistory: history.currentDiseaseHistory,
      physicalExam: history.physicalExam,
      diagnosis: history.diagnosis,
      treatment: history.treatment,
      followUp: history.followUp,
      observations: history.observations,
      queryId: history.queryId,
      professionalId: history.professionalId,
      patientId: history.patientId,
      clinicId: history.clinicId,
    };
  }

  async collection(histories: PatientHistory[]) {
    return await Promise.all(
      histories.map(async (history) => await this.item(history.dataValues)),
    );
  }
}
