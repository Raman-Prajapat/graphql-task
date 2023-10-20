import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  oldPassword: string;

  @Field(() => String)
  newPassword: string;
}
