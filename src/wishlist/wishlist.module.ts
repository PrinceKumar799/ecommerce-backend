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
import { User } from 'src/user/entities/user.entity';

@Module({
	//,UserModule,ProductModule
	imports:[TypeOrmModule.forFeature([Wishlist,User,Product]),UserModule,ProductModule],
	controllers: [WishlistController],
	providers: [WishlistService,UserService,ProductService],//ProductService
	exports:[WishlistService],
})
export class WishlistModule {}
