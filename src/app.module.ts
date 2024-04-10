import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CartModule } from "./cart/cart.module";
import { UserModule } from "./user/user.module";
import { WishlistModule } from "./wishlist/wishlist.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { Product } from "./product/entities/product.entity";
import { Review } from "./review/entities/review.entity";
import { Cart } from "./cart/entities/cart.entity";
import { Wishlist } from "./wishlist/entities/wishlist.entity";
import { ServerModule } from "./server/server.module";
//import { ServerModule } from "./server/server.module";
import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USENAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product, Review, Cart, Wishlist],
      synchronize: true,
    }),
    CacheModule.register({ 
      isGlobal: true,
      ttl:100,
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    CartModule,  
    UserModule,
    WishlistModule,
    AuthModule,
    ProductModule,
    ReviewModule,
    ServerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports:[CacheModule]
})
export class AppModule {}
