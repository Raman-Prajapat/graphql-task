import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}

@ObjectType()
export class LoggedInUser {
  @Field()
  accessToken: string;
}
