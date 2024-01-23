import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { error } from 'console';

@Injectable()
export class ProductService {

  constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
  ) { }
  
  async create(createProductDto: CreateProductDto,createdBy: string) {
    try {
      const product = this.productRepository.create({ ...createProductDto, createdAt: Date(), updatedAt: Date(), createdBy });
      console.log(product)
      const res = await this.productRepository.save(product);
      return res;
    } catch (error) {
      throw new ConflictException("Resource already Present");
    }
  }

  async findAll(page: number, limit: number, priceGreaterThan?: number,priceLessThan ?: number, name?: string) {
    const filter: any = {} 
    if (priceGreaterThan)
    {
      filter.price = MoreThanOrEqual(priceGreaterThan);
    }
    if (priceLessThan)
    {
      filter.price = LessThanOrEqual(priceLessThan);  
    }

    if (name)
    {
      filter.name = Like(`%${name}%`);
    }
    //console.log(filter);
    const [data, total] = await this.productRepository.findAndCount({
      where: { ...filter },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {data, nextPage:page+1,limit};
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { productId: id } })
      console.log(product);
      if (!product)
        throw new NotFoundException("Resource not found");
      return product;
    }
    catch (error) {
      throw error;
    } 
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
