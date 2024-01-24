import { Module } from '@nestjs/common';
import { Server } from './server.interface';
import { serverProvider } from './server.provider';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [serverProvider],
    exports: ["Server"]
  })
  export class ServerModule {}
