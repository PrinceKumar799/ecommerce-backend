import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	  ) {}
	async create(createUserDto: CreateUserDto) {
		try {
			const hasedPass = await bcrypt.hash(createUserDto.password, 10);
			createUserDto.password = hasedPass;
			const user = this.usersRepository.create(createUserDto);
			//console.log("next");
			const { password, ...res } = await this.usersRepository.save(user);
			return res;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async findAll() {
		return await this.usersRepository.find();
	}

	async findOne(email: string) {
		return await this.usersRepository.findOne({where:{email}});
	}

	async update(email: string, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user)
			throw new NotFoundException("User not found");
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
	}

	async remove(email: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user)
			throw new NotFoundException("User not found");
		return await this.usersRepository.remove(user);
	}
}
