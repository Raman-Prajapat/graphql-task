import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto';
import md5 from 'md5';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from '@Common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  private generateJwt(payload: JwtPayload, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  async isEmailAlreadyExist(email: string): Promise<boolean> {
    return (
      (await this.userModel.count({
        where: {
          email,
        },
      })) !== 0
    );
  }

  async create(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    if (await this.isEmailAlreadyExist(email))
      throw new Error('Email already exist');

    const user = await this.userModel.create({
      email,
      first_name: firstName,
      last_name: lastName,
      password: md5(password),
    });

    return {
      id: user.dataValues.id,
      firstName: user.dataValues.first_name,
      lastName: user.dataValues.last_name,
    };
  }

  async findById(id: number) {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) throw new Error('User not found');

    if (user.dataValues.password !== md5(password)) {
      throw new Error('Password does not match');
    }
    return {
      accessToken: this.generateJwt({
        sub: user.id,
      }),
      email: user.email,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async update(id: number, firstName: string, lastName: string, email: string) {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');

    await this.userModel.update(
      { first_name: firstName, last_name: lastName, email },
      { where: { id } },
    );

    return 'Updated Successfully';
  }
}
