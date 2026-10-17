import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Connexion réussie à PostgreSQL (malick_buss_db)');
    } catch (error) {
      this.logger.error(`⚠️ Impossible de se connecter à PostgreSQL : ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
