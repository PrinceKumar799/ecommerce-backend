/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Review } from "src/review/entities/review.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Wishlist } from "src/wishlist/entities/wishlist.entity";
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

    // @Column()
    // createdAt: Date;

    // @Column()
    // updatedAt: Date;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
  
    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];

    @OneToMany(() => Wishlist, wishlist => wishlist.user)
    wishlist: Wishlist[];
}
