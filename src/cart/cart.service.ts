// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findById(userId: number) {
    const cart = await this.cartRepository.find( {where:{user:{userId}}});
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addItem(userId:number,productId:number,quantity:number): Promise<Cart> {
    const cartItem = await this.cartRepository.create({user:{userId},product:{productId},quantity,updatedAt:Date(),})
    return await this.cartRepository.save(cartItem);
  }

	
  async removeItem(userId:number,productId:number) {
	  const cart = await this.cartRepository.findOne({ where: { user: { userId }, product: { productId } } });
	  if (!cart)
		  throw new NotFoundException();

    	return await this.cartRepository.remove(cart);
  }        

  async clearCart(userId: number) {
    const cart = await this.cartRepository.findOne({ where: { user: { userId }} });
	  if (!cart)
		  throw new NotFoundException();

    	return await this.cartRepository.remove(cart);
  }
	
}
