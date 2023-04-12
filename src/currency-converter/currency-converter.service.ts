import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { HttpException, Injectable } from '@nestjs/common';
import { CurrencyConverterRepository } from './currency-converter.repository';
import { CurrencyConvertDto } from './dto/converte-currency.dto';
import { CurrencyConverter } from './entities/currency-converter.entity';
const axios = require('axios');

@Injectable()
export class CurrencyConverterService {
  constructor(
    private readonly currencyConverterRepository: CurrencyConverterRepository,
  ){}

  async convertCurrency(convertData: CurrencyConvertDto, userId: string){
    const options = this.requestOptions(convertData);
    let response = await axios.request(options)
    .catch(function (error: any) {
      throw new HttpException(error.response.data.error, 400);
		});
    let currencyConvertData = this.createSaveObject(convertData, userId, response.data.info.rate)
    let finalData = {
      ...await this.currencyConverterRepository.createCurrency(currencyConvertData),
      convertedAmound: +response.data.result.toFixed(2)
    };
    return finalData;
  }

  async getAllConvertions(userId: string){
    return await this.currencyConverterRepository.getAllByUserId(userId)
  }

  createSaveObject(convertData: CurrencyConvertDto, userId: string, conversionRate: number){
    return {
      userId: userId,
      fromCurrency: convertData.fromCurrency,
      originalAmount: +convertData.originalAmount.toFixed(2),
      toCurrency: convertData.toCurrency,
      conversionRate: +conversionRate.toFixed(2),
      date: new Date().toUTCString()
    }
  }

  requestOptions(convertData: CurrencyConvertDto){
    return{
      method: 'GET',
      url: `https://api.apilayer.com/exchangerates_data/convert?to=${convertData.toCurrency}&from=${convertData.fromCurrency}&amount=${convertData.originalAmount}`,
      headers: {
        'apikey': 'YwcwsM45dSCtVKCVmKYi3EzLnFmpuRwr',
      },
    };
  }
}
