import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommissionsModule } from './modules/commissions/commissions.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SubOrdersModule } from './modules/sub-orders/sub-orders.module';
import { UsersModule } from './modules/users/users.module';
import { ShopsModule } from './modules/shops/shops.module';
import { ProductsModule } from './modules/products/products.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './api/orders/orders.module';
import { AdminModule } from './api/admin/admin.module';
import { OrdersController } from './api/orders/orders.controller';
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CartModule,
    CategoriesModule,
    CommissionsModule,
    DeliveriesModule,
    DisputesModule,
    NotificationsModule,
    SubOrdersModule,
    UsersModule,
    ShopsModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
    AdminModule,
  ],
  controllers: [],
  providers: [RequestIdMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes(OrdersController);
  }
}

