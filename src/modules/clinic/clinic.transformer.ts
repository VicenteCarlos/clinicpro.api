import { Clinic } from './clinic.entity';

export class ClinicTransformer {
  public async item(data: Clinic): Promise<Clinic> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
    } as Clinic;
  }

  public async collection(data: Clinic[]): Promise<Clinic[]> {
    return await Promise.all(
      data.map(async (Clinic) => await this.item(Clinic.dataValues)),
    );
  }
}
