import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, LoggedInUser, Profile } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput, UpdatePasswordInput } from './dto';
import { Req, UseGuards } from '@nestjs/common';
import { AuthenticatedUser, JwtAuthGuard } from '@Common';
import { CurrentUser, getContext } from './user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  updateUser(@CurrentUser() user: any, @Args('data') data: UpdateUserInput) {
    const ctx = getContext(user);
    return this.usersService.update(
      ctx.user,
      data.firstName,
      data.lastName,
      data.email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  changePassword(
    @CurrentUser() user: any,
    @Args('data') data: UpdatePasswordInput,
  ) {
    const ctx = getContext(user);
    return this.usersService.changePassword(
      ctx.user,
      data.oldPassword,
      data.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Profile)
  getProfile(@CurrentUser() user: any) {
    const ctx = getContext(user);
    return this.usersService.getProfile(ctx.user);
  }
}
