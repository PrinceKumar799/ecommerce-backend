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
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller("products")
@ApiTags('Products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
    private readonly cartService: CartService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiCreatedResponse({ description: 'Product added successfully' })
  @ApiConflictResponse({ description: "Product already exists" })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.product.id);
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
      req.product.productId,
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
      req.product.productId,
      +productId,
      +bodyObj.quantity
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":productId/reviews/:reviewId")
  removeReview(@Param("reviewId") reviewId: string) {
    return this.reviewService.remove(+reviewId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the products' })
  @ApiResponse({ status: 200, description: 'All products reterived' })
  @ApiQuery({ name: 'p', description: 'Page number', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'l', description: 'Number of items per page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'priceGreaterThan', description: 'Filter by price greater than', required: false, type: Number, example: 0})
  @ApiQuery({ name: 'priceLessThan', description: 'Filter by price less than', required: false, type: Number, example: 100 })
  @ApiQuery({ name: 'name', description: 'serach products having the pattern as name', required: false, type: String, example: "sam" })

  findAll(@Query('p') p: number = 1, @Query('l') l: number = 1, @Query('priceGreaterThan') priceGreaterThan?: number, @Query('priceLessThan') priceLessThan?: number, @Query('name') name?: string) {
    return this.productService.findAll(+p,+l,priceGreaterThan,priceLessThan,name);
  }

  @Get(":id")
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'product details retrieved successfully' })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({ status: 200, description: 'product details updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({description:"Could not complete the request"})
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({ status: 200, description: 'product deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({description:"Could not complete the request"})
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
