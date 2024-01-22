// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
// import { ReviewService } from './review.service';
// import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
// import { AuthGuard } from 'src/auth/auth.guard';

// @Controller('reviews')
// export class ReviewController {
//   constructor(private readonly reviewService: ReviewService) {}

//   @Get()
//   findAll() {
//     return this.reviewService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.reviewService.findOne(+id);
//   }

//   @UseGuards(AuthGuard)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
//     return this.reviewService.update(+id, updateReviewDto);
//   }

//   @UseGuards(AuthGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.reviewService.remove(+id);
//   }
// }
