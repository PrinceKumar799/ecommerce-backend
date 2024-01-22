// src/cart/cart.controller.ts
import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
	constructor(private readonly cartService: CartService) { }

  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    return this.cartService.findById(userId);
  }

  @Patch(':userId/remove/:itemId')
  async removeItemFromCart(@Param('userId') userId: number, @Param('itemId') itemId: number) {
    return this.cartService.removeItem(userId, itemId);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}
