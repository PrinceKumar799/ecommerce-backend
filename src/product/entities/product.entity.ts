import { Exclude } from 'class-transformer';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/review/entities/review.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stockQuantity: number;

  @Column({ nullable: true })
    createdBy: string;
    
  @CreateDateColumn({ type: 'timestamp' })
    @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    @Exclude()
    updatedAt: Date;
    
    @OneToMany(() => Review, review => review.product)
  review: Review[];
  
  @OneToMany(() => Cart, cart => cart.product)
  carts: Cart[];

  @OneToMany(() => Wishlist, wishlist => wishlist.product)
  wishlist: Wishlist[];

}
