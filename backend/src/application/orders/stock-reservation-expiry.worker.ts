import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { OrdersApplicationService } from './orders.application.service';

@Injectable()
export class StockReservationExpiryWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StockReservationExpiryWorker.name);
  private interval?: NodeJS.Timeout;
  private running = false;

  constructor(private readonly orders: OrdersApplicationService) {}

  onModuleInit(): void {
    this.interval = setInterval(() => void this.releaseExpired(), 60_000);
    this.interval.unref();
    void this.releaseExpired();
  }

  onModuleDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  private async releaseExpired(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      const expiredCount = await this.orders.expireUnpaidReservations();
      if (expiredCount > 0) this.logger.log(`Réservations expirées libérées: ${expiredCount}`);
    } catch (error) {
      this.logger.error('Échec du traitement des réservations expirées.', error instanceof Error ? error.stack : undefined);
    } finally {
      this.running = false;
    }
  }
}