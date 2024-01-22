import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
// import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Review,User,Product])],
  controllers: [],
  providers: [ReviewService],
  exports:[ReviewService],
})
export class ReviewModule {}
