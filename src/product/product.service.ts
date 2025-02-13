import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { error } from 'console';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductService {

  constructor(
		@InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(CACHE_MANAGER)private readonly cacheManager: Cache
  ) { }
  
  async create(createProductDto: CreateProductDto,createdBy: string) {
    try {
      console.log("here");
      const product = this.productRepository.create({ ...createProductDto, createdAt: Date(), updatedAt: Date(), createdBy });
      console.log(product)
      const res = await this.productRepository.save(product);
      return res;
    } catch (error) {
      throw new ConflictException("Resource already Present");
    }
  }

  async findAll(page: number, limit: number, priceGreaterThan?: number, priceLessThan?: number, name?: string) {
    const filter: any = {}
    if (priceGreaterThan) {
      filter.price = MoreThanOrEqual(priceGreaterThan);
    }
    if (priceLessThan) {
      filter.price = LessThanOrEqual(priceLessThan);
    }

    if (name) {
      filter.name = Like(`%${name}%`);
    }
    // console.log(filter);
    // const cachedProducts = await this.cacheManager.get('Products');
    // if (cachedProducts)
    //   return cachedProducts;
    const [data, total] = await this.productRepository.findAndCount({
      select:['productId','price','ratings','description','stockQuantity','name','category','image'],
      where: { ...filter },
      skip: (page - 1) * limit,
      take: limit,
    });
    // await this.cacheManager.set('Products', { source: "Cache" });
    console.log("Cache Miss");
    return {data, nextPage:page+1,limit};
  }

  async findOne(id: number) {
    try {
      const productWithReview = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.review', 'review')
        .leftJoinAndSelect('review.user', 'user')
        .where('product.productId = :id', { id })
        .select([
          'product.name',
          'product.category',
          'product.ratings',
          'product.price',
          'product.image',
          'product.description',
          'product.stockQuantity',
          'review.reviewId',
          'review.content', // Alias to prevent naming conflict
          'user.userId',
          'user.firstName',
          'user.lastName'
        ])
        .getOne();

      if (!productWithReview)
        throw new NotFoundException("Resource not found");

      return productWithReview; 
    } catch (error) {
      throw error;
    }
  }

 async findAllByUser(userId: number)
 {
   console.log("userId:" ,userId);
    const data = await this.productRepository.find({
      select:['productId','price','ratings','description','stockQuantity','name','category','image'],
      where: {createdBy:String(userId)},
    });
    // await this.cacheManager.set('Products', { source: "Cache" });
    console.log(data);
    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { productId: id } })
      if (!product)
        throw new NotFoundException("Resource not found");
      Object.assign(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { productId: id } })
      if (!product)
        throw new NotFoundException("Resource not found");
      return await this.productRepository.remove(product);
    } catch (error) {
      throw error;
    }
  }
}

