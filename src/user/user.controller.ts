/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from 'src/auth/dto/singIn-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService,private readonly authService: AuthService) {}

  @Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
  }
  
  @Post('login')
  singIn(@Body() singInDto: SignInDto)
  {
    return this.authService.singIn(singInDto);
  }

  @Get()
  findAll() {
  	return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') email: string) {
  	return this.userService.findOne(email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') email: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    
    console.log("req.user.email, email");
    if (req.user.email !== email)
      throw new UnauthorizedException();
  	return this.userService.update(email, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
  	return this.userService.remove(email);
  }
}
