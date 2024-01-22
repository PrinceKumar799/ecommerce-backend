/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Review } from "src/review/entities/review.entity";
import { Cart } from "src/cart/entities/cart.entity";
/* eslint-disable prettier/prettier */
@Entity({name:'user'})
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column()
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    password: string;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
  
    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];
}
