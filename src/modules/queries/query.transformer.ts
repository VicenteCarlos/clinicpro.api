import { Query } from './query.entity';

export class QueryTransformer {
  public async item(data: Query): Promise<Query> {
    return {
      id: data.id,
      patient_id: data.patient_id,
      professional_id: data.professional_id,
      clinicId: data.clinicId,
      date: data.date,
      time: data.time,
      specialty: data.specialty,
      notes: data.notes,
      status: data.status,
      patient: {
        id: data.patient.dataValues.id,
        full_name: data.patient.dataValues.full_name,
        email: data.patient.dataValues.email,
        phone: data.patient.dataValues.phone,
        cpf: data.patient.dataValues.cpf,
        birth_date: data.patient.dataValues.birth_date,
        street: data.patient.dataValues.street,
        number: data.patient.dataValues.number,
        city: data.patient.dataValues.city,
        state: data.patient.dataValues.state,
        zip_code: data.patient.dataValues.zip_code,
      },
      professional: {
        id: data.professional.dataValues.id,
        full_name: data.professional.dataValues.full_name,
        email: data.professional.dataValues.email,
        phone: data.professional.dataValues.phone,
        crm: data.professional.dataValues.crm,
        specialty: data.professional.dataValues.specialty,
        clinicId: data.professional.dataValues.clinicId,
        working_hours: data.professional.dataValues.working_hours,
      },
    } as Query;
  }

  public async createItem(data: Query): Promise<Query> {
    return {
      id: data.id,
      patient_id: data.patient_id,
      professional_id: data.professional_id,
      clinicId: data.clinicId,
      date: data.date,
      time: data.time,
      specialty: data.specialty,
      notes: data.notes,
      status: data.status,
    } as Query;
  }

  public async collection(data: Query[]): Promise<Query[]> {
    return await Promise.all(
      data.map(async (query) => {
        return await this.item(query.dataValues);
      }),
    );
  }
}
