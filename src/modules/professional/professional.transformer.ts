import { Professional } from './professional.entity';

export class ProfessionalTransformer {
  public async item(data: Professional): Promise<Professional> {
    return {
      id: data.id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      crm: data.crm,
      specialty: data.specialty,
      clinicId: data.clinicId,
      working_hours: data.working_hours,
    } as Professional;
  }

  public async collection(data: Professional[]): Promise<Professional[]> {
    return await Promise.all(
      data.map(
        async (professional) => await this.item(professional.dataValues),
      ),
    );
  }
}
