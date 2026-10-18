import { Module } from '@nestjs/common';
import { WaveGateway } from './gateways/wave.gateway';
import { OrangeMoneyGateway } from './gateways/orange-money.gateway';
import { FreeMoneyGateway } from './gateways/free-money.gateway';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [WaveGateway, OrangeMoneyGateway, FreeMoneyGateway, PaymentService],
  exports: [PaymentService],
})
export class PaymentsModule {}
