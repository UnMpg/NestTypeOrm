import { Profile } from 'src/typeorm/entities/Profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { Post } from 'src/typeorm/entities/Post';

@Module({
  imports : [TypeOrmModule.forFeature([User,Profile,Post])],
  controllers: [UserController],
  providers: [UsersService]
})
export class UsersModule {}
