import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { Product } from './product/entities/product.entity';
import { Review } from './review/entities/review.entity';
import { Cart } from './cart/entities/cart.entity';
import { Wishlist } from './wishlist/entities/wishlist.entity';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'root',
		database: 'ecommerce',
		entities: [User,Product,Review,Cart,Wishlist],
		synchronize: true,
	  }),CartModule, UserModule, WishlistModule, AuthModule, ProductModule, ReviewModule],
	controllers: [AppController],
	providers: [AppService, AuthService],
})
export class AppModule {}
