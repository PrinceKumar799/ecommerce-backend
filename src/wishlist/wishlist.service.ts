import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistService {
	constructor(
		@InjectRepository(Wishlist)
		private readonly wishlistRepository: Repository<Wishlist>,) { }
	async create(productId: number, userId: number) {
		try {
			const product = await this.wishlistRepository.findOne({ where: { user: { userId }, product: { productId } } });

			if (product)
				throw new ConflictException("Product already exists in wishlist");
			console.log(product);
			const wishItem = await this.wishlistRepository.create({ user: { userId }, product: { productId }, updatedAt: Date() });

			return await this.wishlistRepository.save(wishItem);
		}
		catch (err)
		{
			throw new InternalServerErrorException();
		}
	}

	async findAll() {
		return await this.wishlistRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} wishlist`;
	}

	update(id: number, updateWishlistDto: UpdateWishlistDto) {
		return `This action updates a #${id} wishlist`;
	}

	async remove(userId: number, productId: number) {
		const wishlistItem = await this.wishlistRepository.find({where:{user:{userId},product:{productId}}})
		return await this.wishlistRepository.remove(wishlistItem);
	}
}
