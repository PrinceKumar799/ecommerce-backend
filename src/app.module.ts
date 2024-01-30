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
import * as redisStore  from "cache-manager-redis-store";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "ecommerce",
      entities: [User, Product, Review, Cart, Wishlist],
      synchronize: true,
    }),
    CacheModule.register({ 
      isGlobal: true,
      ttl:10,
      store: redisStore,
      url: "redis://localhost:6379",
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
