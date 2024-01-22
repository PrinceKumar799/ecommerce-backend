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
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) { }

	@Get()
	findAll() {
		return this.wishlistService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.wishlistService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateWishlistDto: UpdateWishlistDto,
	) {
		return this.wishlistService.update(+id, updateWishlistDto);
	}

	@UseGuards(AuthGuard)
	@Delete('removeProduct/:productId')
	remove(@Param('productId') prodcutId: string,@Request() req) {
		return this.wishlistService.remove(+prodcutId,req.user.userId);
	}
}
