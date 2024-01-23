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
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) { }

	@UseGuards(AuthGuard)
	// @Get()
	// findAll(@Request() req) {
	// 	const userId = req.user.userId;
	// 	return this.wishlistService.findAll(userId);
	// }

	@UseGuards(AuthGuard)
	@Get()
	findOne(@Request() req) {
		return this.wishlistService.findByUser(req.user.userId);
	}
	// @Patch(':id')
	// update(
	// 	@Param('id') id: string,
	// 	@Body() updateWishlistDto: UpdateWishlistDto,
	// ) {
	// 	return this.wishlistService.update(+id, updateWishlistDto);
	// }

	@UseGuards(AuthGuard)
  @Post("")
  addToWishlist(@Body() body, @Request() req) {
    //console.log("route confirmed");
    return this.wishlistService.create(body.prodcutId,req.user.userId,);
  }
	@UseGuards(AuthGuard)
	@Delete('removeProduct/:productId')
	remove(@Param('productId') prodcutId: string,@Request() req) {
		return this.wishlistService.remove(+prodcutId,req.user.userId);
	}
}
