// src/cart/cart.controller.ts
import { Controller, Post, Get, Param, Body, Patch, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Product } from 'src/product/entities/product.entity';

@Controller('carts')
export class CartController {
	constructor(private readonly cartService: CartService) { }

  @UseGuards(AuthGuard)
  @Patch('remove')
  async removeItemFromCart(@Request() req, @Query('productId') productId: number) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

  @UseGuards(AuthGuard)
  @Delete('/clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCart(@Request() req) {
    return this.cartService.find(req.user.userId);
  }
}
