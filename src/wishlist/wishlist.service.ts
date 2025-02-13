import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WishlistService {
	constructor(
		@InjectRepository(Wishlist)
		private readonly wishlistRepository: Repository<Wishlist>,private readonly productService: ProductService, private readonly userService: UserService) {//, 
		}
	async create(productId: number, userId: number) {
		try {
			console.log(userId,productId);
			const wishListProduct = await this.wishlistRepository.findOne({ where: { user: { userId }, product: { productId } } });
			if (wishListProduct)
				throw new ConflictException("Product already exists in wishlist");
			const productExists = await this.productService.findOne(productId);
			//console.log("herr");
				if (!productExists)
				{
					//console.log(productExists);
					throw new BadRequestException("No Such Product exists");
				} 
			//console.log(productExists);
			const wishItem = await this.wishlistRepository.create({ user: { userId }, product: { productId }, updatedAt: Date() });
			console.log("wishlist",wishItem);
			return await this.wishlistRepository.save(wishItem);
		}
		catch (err)
		{
			throw err;
		}
	}

	async findAll(userId: number) {
		return await this.wishlistRepository.find();
	}

	async findByUser(userId: number) {
		return await this.wishlistRepository.find({ where: { user: { userId } } ,relations:['product']}) ;
	}

	// update(id: number, updateWishlistDto: UpdateWishlistDto) {
	// 	return `This action updates a #${id} wishlist`;
	// }

	async remove(productId: number, userId: number) {
		//console.log(productId, userId);
		const wishlistItem = await this.wishlistRepository.find({ where: { user: { userId }, product: { productId } } })
		//console.log(wishlistItem);
		return await this.wishlistRepository.remove(wishlistItem);
	}
}
