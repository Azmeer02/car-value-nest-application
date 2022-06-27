import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './userDtos/createUser.dto';
import { UpdateUserDto } from './userDtos/updateUser.dto'; 
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './userDtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService : UsersService){}
    @Post('/signup')
    createUser(@Body() body: createUserDto){
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findOneUser(@Param('id') id: string){
        console.log("Handler is running....")
        const oneUser = await this.userService.findOne(parseInt(id));
        if(!oneUser){
            throw new NotFoundException('User Not Found...!');
        }
        return oneUser;
    }
    
    // @UseInterceptors(SerializeInterceptor)
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
