import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>){}

    create(email: string, password: string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);
    }
    findOne(id: number){
        if(!id){
            return null;
        }
        return this.repo.findOne(id);
    }
    findByEmail(email: string){
        return this.repo.find({email});
    }
    async findAll(){
        const allUsers = await this.repo.find();
        if(!allUsers){
            throw new NotFoundException("No Data is available at the moment...");
        }
        return allUsers;
    }
    async update(id: number, attributes: Partial<UserEntity>){
        const updatedUser = await this.findOne(id);
        if(!updatedUser){
            throw new NotFoundException("User Not Found...!");
        }
        Object.assign(updatedUser,attributes);
        return this.repo.save(updatedUser);
    }
    async remove(id: number){
        const removeUser = await this.findOne(id);
        if(!removeUser){
            throw new NotFoundException("User Not Found...!");
        }
        return this.repo.remove(removeUser);
    }
} 
