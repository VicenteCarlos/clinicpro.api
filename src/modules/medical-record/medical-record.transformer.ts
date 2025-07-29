import { MedicalRecord } from './medical-record.entity';

export class MedicalRecordTransformer {
  public async item(data: MedicalRecord): Promise<MedicalRecord> {
    return {
      id: data.id,
      patient_id: data.patient_id,
      professional_id: data.professional_id,
      appointment_id: data.appointment_id,
      record_date: data.record_date,
      record_type: data.record_type,
      specialty: data.specialty,
      chief_complaint: data.chief_complaint,
      history_of_present_illness: data.history_of_present_illness,
      physical_examination: data.physical_examination,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      follow_up: data.follow_up,
      notes: data.notes,
      attachments: data.attachments,
    } as MedicalRecord;
  }

  public async collection(data: MedicalRecord[]): Promise<MedicalRecord[]> {
    return await Promise.all(
      data.map(
        async (MedicalRecord) => await this.item(MedicalRecord.dataValues),
      ),
    );
  }
}
