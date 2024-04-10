// src/cart/cart.controller.ts
import { Controller, Post, Get, Param, Body, Patch, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Product } from 'src/product/entities/product.entity';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@Controller('carts')
@ApiTags('Carts')
export class CartController {
  
	constructor(private readonly cartService: CartService) { }

  @UseGuards(AuthGuard)
  @Post('checkout')
  async checkoutCart(@Body() body: { amount: number; currency: string }) {
    console.log("Body",body);
    const { amount, currency } = body;
    const paymentIntent = await this.cartService.createPaymentIntent(amount, currency);
    return { clientSecret: paymentIntent.client_secret };
  }
  @UseGuards(AuthGuard)
  @Patch("/removeOne")
  removeOneItemFromCart(
    @Request() req,
    @Body() bodyObj: { productId: string }
  ) {
    console.log(bodyObj);  
    return this.cartService.removeOne(
      req.user.userId,
      +bodyObj.productId,
    );
  }
  @UseGuards(AuthGuard)
  @Post("/addToCart")
  addToCart(
    @Request() req,
    @Body() bodyObj: { productId: string }
  ) {
    console.log(bodyObj);
    return this.cartService.addItem(
      req.user.userId,
      1,
      +bodyObj.productId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('remove')
  @ApiOperation({ summary: 'Add product by product Id' })
  @ApiResponse({ status: 200, description: 'Product added into cart sucessfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: "Could not complete the request" })
  @ApiBadRequestResponse({description:"Provide productId to add"})
  async removeItemFromCart(@Request() req, @Query('productId') productId: number) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: "Could not complete the request" })
  @ApiNotFoundResponse({description:"No item in the cart to clear"})
  @Delete('/clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get cart of loggedIn user' })
  @ApiResponse({ status: 200, description: 'Cart details retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCart(@Request() req) {
    return this.cartService.find(req.user.userId);
  }
}
