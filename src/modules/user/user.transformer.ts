import { User } from './user.entity';

export class UserTransformer {
  public async item(data: User): Promise<User> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    } as User;
  }

  public async collection(data: User[]): Promise<User[]> {
    return await Promise.all(data.map(async (user) => await this.item(user.dataValues)));
  }
}
