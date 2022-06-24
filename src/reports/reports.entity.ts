import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportsEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;
}