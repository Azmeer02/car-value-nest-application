import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UsersService){}

    async signUp(email: string, password: string){
        // See if email is in use...
        const users = await this.userService.findByEmail(email);
        if(users.length){
            throw new BadRequestException("Email is in Use...!")
        }
        // Hashing User's Password...

        // Generating Salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and password together
        const result = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const concatenate = salt + '/' + result.toString('hex');

        // Creating a user and saving into db
        const user = await this.userService.create(email, concatenate);
        return user;
    }
    async signIn(email: string, password: string){
        const [user] = await this.userService.findByEmail(email);
        if(!user){
            throw new NotFoundException("User Not Found...!")
        }
        const [salt, storedHash] = user.password.split('/');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException("Bad Password...");
        }
        return user;
    }
}