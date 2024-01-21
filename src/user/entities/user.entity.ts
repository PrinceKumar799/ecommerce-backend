/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

/* eslint-disable prettier/prettier */
@Entity({name:'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    password: string;
}
