import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  is_active: boolean;
}
