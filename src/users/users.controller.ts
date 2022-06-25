import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { createUserDto } from './userDtos/createUser.dto';
import { UpdateUserDto } from './userDtos/updateUser.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService : UsersService){}
    @Post('/signup')
    createUser(@Body() body: createUserDto){
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findOneUser(@Param('id') id: string){
        const oneUser = await this.userService.findOne(parseInt(id));
        if(!oneUser){
            throw new NotFoundException('User Not Found...!');
        }
        return oneUser;
    }

    @Get()
    findUserWithEmail(@Query('email') email: string){
        return this.userService.findByEmail(email);
    }

    @Get('/allUsers/users')
    getAllUsers(){
        return this.userService.findAll();
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string , @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }
}
