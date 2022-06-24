import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './userDtos/createUser-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService : UsersService){}
    @Post('/signup')
    createUser(@Body() body: createUserDto){
        this.userService.create(body.email, body.password);
    }
}
