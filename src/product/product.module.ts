import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/entities/review.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartModule } from 'src/cart/cart.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { ReviewModule } from 'src/review/review.module';
import { CacheModule } from '@nestjs/cache-manager';
// import { Cart } from 'src/cart/entities/cart.entity';

/**
 * imports:[TypeOrmModule.forFeature([User])],
	controllers: [UserController],
  providers: [UserService,AuthService],
  exports:[UserService]
 */
@Module({
  imports:[TypeOrmModule.forFeature([Product,Review,Cart,Wishlist]),CartModule,ReviewModule],
  controllers: [ProductController],
  providers: [ProductService,ReviewService,CartService],
  exports:[ProductService]
})
export class ProductModule {}
