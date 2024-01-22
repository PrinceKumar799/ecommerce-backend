import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
//@Unique(['productId', 'userId'])
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Product, product => product.review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  // ... other fields
}
