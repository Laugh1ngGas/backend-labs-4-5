import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { Category } from './categories/category.entity';
import { Product } from './products/products.entity';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'db.env',
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080', 
      realm: 'lab-4-5',
      clientId: 'nest-app',
      secret: 'HIUuBcqn0XmFn3Nzl1X2Vbjy2OSD77Bu', 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'password',
      database: 'keycloak',
      entities: [Category, Product],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriesModule,
    ProductsModule,
  ],
  providers: [
    // Global Authentication Guard
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // Global Resource Guard
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // Global Role Guard
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}