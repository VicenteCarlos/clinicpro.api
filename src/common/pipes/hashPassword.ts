import { PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class HashPipe implements PipeTransform {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly field: string = 'password') {}

  async transform(data: any) {
    if (data[this.field]) {
      data[this.field] = bcrypt.hashSync(data[this.field], this.SALT_ROUNDS);
    }

    return data;
  }
}
