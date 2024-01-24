// server.provider.ts
import { Repository } from 'typeorm';
import { StaticServer } from './static-server/static-server.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
export const serverProvider = {
  provide: 'Server',
  useFactory: (userRepository: Repository<User>) => {
    // Decide dynamically which service to provide based on some application logic
    let serverNumber = Math.random();
    return serverNumber>0.5 ? new StaticServer(): new UserService(userRepository);
  },
  inject: [getRepositoryToken(User)], 
};
