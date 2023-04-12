import { Module } from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConverterController } from './currency-converter.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AuthModule } from 'src/auth/auth.module';
import { CurrencyConverterRepository } from './currency-converter.repository';

@Module({
  imports: [InMemoryDBModule, AuthModule],
  controllers: [CurrencyConverterController],
  providers: [CurrencyConverterService, CurrencyConverterRepository]
})
export class CurrencyConverterModule {}
