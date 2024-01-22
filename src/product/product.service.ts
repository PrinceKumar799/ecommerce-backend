import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { productId: id } })
      if (!product)
        throw new NotFoundException("Resource not found");
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { productId: id } })
      if (!product)
        throw new NotFoundException("Resource not found");
      return await this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
