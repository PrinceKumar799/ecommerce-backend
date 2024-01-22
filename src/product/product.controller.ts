import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateReviewDto } from "src/review/dto/create-review.dto";
import { ReviewService } from "src/review/review.service";
import { UpdateReviewDto } from "src/review/dto/update-review.dto";
import { CartService } from "src/cart/cart.service";
import { WishlistService } from "src/wishlist/wishlist.service";

@Controller("products")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
    private readonly cartService: CartService,
    private readonly wishlistService: WishlistService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.user.email);
  }

  @UseGuards(AuthGuard)
  @Post(":productId/addReview")
  addReview(
    @Param("productId") productId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Request() req
  ) {
    return this.reviewService.create(
      createReviewDto,
      req.user.userId,
      +productId
    );
  }

  @UseGuards(AuthGuard)
  @Post("updateReview/:reviewId")
  updateReview(
    @Param("reviewId") reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.update(+reviewId, updateReviewDto);
  }

  @Get(":productId/reviews")
  findAllReviews(@Param("productId") productId: string) {
    console.log("route found");
    return this.reviewService.findAll(+productId);
  }

  @Get(":productId/reviews/:reviewId")
  findOneReview(@Param("reviewId") reviewId: string) {
    return this.reviewService.findOne(+reviewId);
  }

  @UseGuards(AuthGuard)
  @Post(":productId/addToCart")
  addToCart(
    @Param("productId") productId: string,
    @Request() req,
    @Body() bodyObj: { quantity: string }
  ) {
    return this.cartService.addItem(
      req.user.userId,
      +productId,
      +bodyObj.quantity
    );
  }

  @UseGuards(AuthGuard)
  @Post(":productId/addToWishlist")
  addToWishlist(@Param("productId") productId: string, @Request() req) {
    console.log("route confirmed");
    return this.wishlistService.create(+productId,req.user.userId,);
  }

  @UseGuards(AuthGuard)
  @Delete(":productId/reviews/:reviewId")
  removeReview(@Param("reviewId") reviewId: string) {
    return this.reviewService.remove(+reviewId);
  }

  @Get()
  findAll(@Query('p') p: number = 1, @Query('l') l: number = 1, @Query('priceGreaterThan') priceGreaterThan?: number, @Query('priceLessThan') priceLessThan?: number, @Query('name') name?: string) {
    return this.productService.findAll(+p,+l,priceGreaterThan,priceLessThan,name);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
