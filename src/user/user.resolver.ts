import { Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { User as UserModel } from './models/user.model';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { GetUserArgs } from './dto/getUser.args';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User | null> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
