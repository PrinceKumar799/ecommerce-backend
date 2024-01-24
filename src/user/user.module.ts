/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AppModule } from 'src/app.module';
import { ServerModule } from 'src/server/server.module';
//import { ServerModule } from 'src/server/server.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),ServerModule],
	controllers: [UserController],
  providers: [UserService,AuthService,],
  exports:[UserService]
})
export class UserModule {}
