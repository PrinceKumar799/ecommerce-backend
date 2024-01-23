import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Module({
	//,UserModule,ProductModule
	imports:[TypeOrmModule.forFeature([Wishlist])],
	controllers: [WishlistController],
	providers: [WishlistService],//,UserService,ProductService
	exports:[WishlistService],
})
export class WishlistModule {}
