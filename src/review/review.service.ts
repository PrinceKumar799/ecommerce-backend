import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
		@InjectRepository(Review)
		private readonly reviewRepository: Repository<Review>,
  ) { }

  async create(createReviewDto: CreateReviewDto,userId: number,productId:number) {
    try {
      const newReview = { ...createReviewDto, user: {userId },    // Assuming User entity has 'id' property
      product: { productId }  };
      
      const review = this.reviewRepository.create(newReview)
      console.log(review);
      const saveReview = await this.reviewRepository.save(review);
      return saveReview;
    }
    catch (err)
    {
      throw new InternalServerErrorException();
    }
  }

  async findAll(productId: number) {
    try {
      console.log('inside service');
      const reviews = await this.reviewRepository.find({ where: {product: { productId } } }) 
      return reviews;
    } catch (error) {
      return new NotFoundException();
    }
  }

  async findOne(reviewId: number) {
    try {
      const review = await this.reviewRepository.findOne({ where: { reviewId } })
      if (!review)
        throw new NotFoundException("Resource not found");
      return review;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(reviewId: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.reviewRepository.findOne({ where: { reviewId } });
      if (!review)
        throw new NotFoundException();
      Object.assign(review, updateReviewDto);
      return await this.reviewRepository.save(review);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(reviewId: number) {
    try {
      const review = await this.reviewRepository.findOne({ where: { reviewId } })
      if (!review)
        throw new NotFoundException("Resource not found");
      return await this.reviewRepository.remove(review);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
