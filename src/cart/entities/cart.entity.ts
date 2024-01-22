// cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartItemId: number;

  @Column()
  quantity: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.carts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, product => product.carts)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
