import { Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/singIn-dto';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,private readonly jwtService: JwtService) { }
    async singIn(signInDto: SignInDto)
    {
        const user = await this.userService.findOne(signInDto.email);
        console.log("user service",user);
        if (!user)
            throw new NotFoundException("User does not exists");
        const decodedPass = await bcrypt.compare(signInDto.password, user.password);
        if (!decodedPass)
            throw new UnauthorizedException();
        const token = await this.jwtService.sign({ email: user.email,userId: user.userId });
        return { token };
    } 
}
