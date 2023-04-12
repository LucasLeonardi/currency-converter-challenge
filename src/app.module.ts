import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';

@Module({
  imports: [UsersModule, InMemoryDBModule, AuthModule, CurrencyConverterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
