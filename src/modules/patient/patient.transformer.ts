import { Patient } from './patient.entity';

export class PatientTransformer {
  public async item(data: Patient): Promise<Patient> {
    return {
      id: data.id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      birth_date: data.birth_date,
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
    } as Patient;
  }

  public async collection(data: Patient[]): Promise<Patient[]> {
    return await Promise.all(
      data.map(async (Patient) => await this.item(Patient.dataValues)),
    );
  }
}
