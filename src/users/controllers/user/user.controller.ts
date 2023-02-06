import { CreateUserPostDto } from './../../dtos/CreateUserPost.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto} from '../../dtos/CreateUser.dto';
import { UpdateUserDto} from '../../dtos/UpdateUser.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto'

@Controller('users')
export class UserController {
    constructor(private userService : UsersService){}
    @Get()
     getUser(){
        return this.userService.findUsers();

    }

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUserById(@Param('id',ParseIntPipe) id : number, @Body() updateUserDto : UpdateUserDto,){
        return await this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id',ParseIntPipe) id : number){
        return await this.userService.deleteUser(id)
    }

    @Post(':id/profile')
    createUserProfile(@Param('id',ParseIntPipe) id: number, @Body() createUserProfileDto : CreateUserProfileDto){
        return this.userService.createUserProfile(id, createUserProfileDto)
    }

    @Post(':id/posts')
    createUserPost(@Param('id', ParseIntPipe) id : number, @Body() createUserPostDto : CreateUserPostDto){
        // return "coba tes";
        return this.userService.createUserPost(id, createUserPostDto);
    }
}
