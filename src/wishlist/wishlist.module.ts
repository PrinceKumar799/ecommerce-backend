import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
	imports:[TypeOrmModule.forFeature([Wishlist])],
	controllers: [WishlistController],
	providers: [WishlistService],
	exports:[WishlistService],
})
export class WishlistModule {}
