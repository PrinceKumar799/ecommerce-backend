// src/cart/cart.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { CreateCartDto } from "./dto/create-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async find(userId: number) {
    const cart = await this.cartRepository.find({
      where: { user: { userId } },
      relations: ["product"],
    });
    const res = cart.map((cartItem) => {
      return {
        cartItemId:cartItem.cartItemId,
        quantity: cartItem.quantity,
        productName: cartItem.product.name,
        price: cartItem.product.price,
        image: cartItem.product.image,
        rating: cartItem.product.ratings,
        productId: cartItem.product.productId,
      };
    });
    return res;
  }

  async removeOne(
    userId: number,
    productId: number
  ): Promise<Cart> {
    let cartItem = await this.cartRepository.findOne({
      where: { user: { userId }, product: { productId } },
    });
    if (cartItem) {
      //cartItem.quantity -= 1;
      if (cartItem.quantity == 1)
        return await this.removeItem(userId, productId);
    } else {
      throw  new NotFoundException();
    }
    return await this.cartRepository.save(cartItem);
  }

  async addItem(
    userId: number,
    quantity: number,
    productId: number
  ): Promise<Cart> {
    let cartItem = await this.cartRepository.findOne({
      where: { user: { userId }, product: { productId } },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({
        user: { userId },
        product: { productId },
        quantity,
      });
    }
    return await this.cartRepository.save(cartItem);
  }

  async removeItem(userId: number, productId: number) {
    if (!productId)
      throw new BadRequestException("Please provide productId in the query");
    const cart = await this.cartRepository.findOne({
      where: { user: { userId }, product: { productId } },
    });
    if (!cart) throw new NotFoundException();

    return await this.cartRepository.remove(cart);
  }

  async clearCart(userId: number) {
    const cart = await this.cartRepository.find({
      where: { user: { userId } },
    });
    if (!cart || cart.length === 0) {
      throw new NotFoundException("Cart not found");
    }

    const removedItems = await this.cartRepository.remove(cart);

    return removedItems;
  }

}
