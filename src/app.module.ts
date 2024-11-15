import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './module/products/products.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';
import { UserModule } from './module/user/user.module';
import { OrderModule } from './module/order/order.module';
import { OrderDetailModule } from './module/order-detail/order-detail.module';
import { SystemModule } from './system/system.module';
import typeOrmConfig from './config/typeorm';
import { SeederModule } from './seed/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    // ProductsModule,
    // UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    UserModule,
    OrderModule,
    OrderDetailModule,
    SystemModule,
    // SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
