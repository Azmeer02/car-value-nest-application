import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;

    // @AfterInsert()
    // logInsert(){
    //     console.log(`Added user with id ${this.id}`);
    // }
    // @AfterUpdate()
    // logUpdate(){
    //     console.log(`Updated user with id ${this.id}`);
    // }
    // @AfterRemove()
    // logRemove(){
    //     console.log(`Removed user with id ${this.id}`);
    // }
}