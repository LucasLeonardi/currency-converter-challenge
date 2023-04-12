import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

interface CurrencyConverter extends InMemoryDBEntity {
  userId: string;
  fromCurrency: string;
  originalAmount: number;
  toCurrency: string;
  conversionRate: number;
  date: string;
}

export { CurrencyConverter }