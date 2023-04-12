import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { CurrencyConverter } from "./entities/currency-converter.entity";

export class CurrencyConverterRepository extends InMemoryDBService<CurrencyConverter>{

  async createCurrency(currencyConvertData){
    return this.create(currencyConvertData)
  }

  async getAllByUserId(userId: string){
    return this.query(record => record.userId === userId)
  }
}