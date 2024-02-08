import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { Server } from 'src/server/server.interface';

@Injectable()
export class UserService implements Server {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	  ) {}
	async create(createUserDto: CreateUserDto) {
		try {
			const existingUser = await this.findOne(createUserDto.email);
			console.log(existingUser);
			if (existingUser)
				throw new BadRequestException("User already exists");
			const hasedPass = await bcrypt.hash(createUserDto.password, 10);
			createUserDto.password = hasedPass;
			const user = this.usersRepository.create({...createUserDto });
			//console.log("next");
			const { password, ...res } = await this.usersRepository.save(user);
			return res;
		} 
		catch (error) {
			throw error;
		}
	}

	async findAll() {
		return await this.usersRepository.find({ select: ['email','firstName','lastName'] });
	}

	async findOne(email: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		//if (neePass)
			return user;
		// const { password, ...res } = user;
		// return res;
	}

	async findOneById(userId: number)
	{
		return await this.usersRepository.findOne({ where: { userId },select: ['email','firstName','lastName'] });
	}

	async update(email: string, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user)
			throw new NotFoundException("User not found");
		Object.assign(user, { ...updateUserDto });
		const { password,userId, ...res } = await this.usersRepository.save(user);
		return res;
	}

	async remove(email: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		if (!user)
			throw new NotFoundException("User not found");
		return await this.usersRepository.remove(user);
	}
}
