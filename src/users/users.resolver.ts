import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, LoggedInUser } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(
      data.email,
      data.firstName,
      data.lastName,
      data.password,
    );
  }

  @Mutation(() => LoggedInUser)
  login(@Args('data') data: LoginUserInput) {
    return this.usersService.login(data.email, data.password);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Mutation(() => Boolean)
  updateUser(@Args('data') data: UpdateUserInput) {
    return this.usersService.update(
      data.id,
      data.firstName,
      data.lastName,
      data.email,
    );
  }
}
