import { Injectable } from '@nestjs/common';
import { Server } from 'src/server/server.interface';


const users = [
    {
        "Data From": "Static Server",
        "email": "sachin@gmail.com",
        "firstName": "Sachin",
        "lastName": "Kumar"
    },
    {
        "Data From": "Static Server",
        "email": "user@gmail.com",
        "firstName": "userFirst",
        "lastName": "userLast"
    }];
@Injectable()
export class StaticServer implements Server {

    findAll() {
        return users;
    }

    findOne(email: string) {
        return users.filter(user => user.email === email);
    }
}