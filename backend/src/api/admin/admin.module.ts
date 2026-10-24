import { Module } from '@nestjs/common';
import { AuthModule } from '../../common/auth/auth.module';
import { PaymentsModule } from '../../modules/payments/payments.module';
import { AdminController } from './admin.controller';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminOperationsService } from './admin-operations.service';
import { AdminShopsService } from './admin-shops.service';
import { AdminWithdrawalService } from './admin-withdrawals.service';

@Module({
  imports: [AuthModule, PaymentsModule],
  controllers: [AdminController],
  providers: [AdminDashboardService, AdminOperationsService, AdminShopsService, AdminWithdrawalService],
})
export class AdminModule {}