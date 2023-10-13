import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async isEmailAlreadyExist(email: string): Promise<boolean> {
    return (
      (await this.userModel.count({
        where: {
          email,
        },
      })) !== 0
    );
  }

  async create(email: string, firstName: string, lastName: string) {
    if (await this.isEmailAlreadyExist(email))
      throw new Error('Email already exist');

    const user = await this.userModel.create({
      email,
      first_name: firstName,
      last_name: lastName,
    });
    return {
      id: user.dataValues.id,
      firstName: user.dataValues.first_name,
      lastName: user.dataValues.last_name,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
