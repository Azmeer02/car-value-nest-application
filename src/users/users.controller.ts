import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './userDtos/createUser.dto';
import { UpdateUserDto } from './userDtos/updateUser.dto'; 
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './userDtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService : UsersService, private authService: AuthService){}
    @Get('/current-user')
    user(@Session() session: any) {
        return this.userService.findOne(session.userId);
    }

    @Post('/signout')
    signout(@Session() session: any){
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: createUserDto, @Session() session: any){
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async logIn(@Body() body: createUserDto, @Session() session: any){
        const user = await this.authService.signIn(body.email, body.password);
        // console.log(session,"session")
        // session.cookie = user.id;
        session.userId = user.id;
        console.log("🚀 ~ session.userId", session.userId)
        return user;
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
