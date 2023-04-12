import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConverterController } from './currency-converter.controller';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConvertDto } from './dto/converte-currency.dto';

describe('CurrencyConverterController', () => {
  let currencyConvertercontroller: CurrencyConverterController;
  let currencyConverterService: CurrencyConverterService

  const convertCurrencyData: CurrencyConvertDto = {
    fromCurrency: "BRL",
    toCurrency: "USD",
    originalAmount: 50,
  }

  const req = {
    user: {
      id:"1"
    }
  }

  const currencyData = {
    convertedAmound: 100,
    userId: "1",
    fromCurrency: "BRL",
    originalAmount: 50,
    toCurrency: "USD",
    conversionRate: 2,
    date: "Thu, 16 Mar 2023 22:48:39 GMT",
    id: "1",
  }



  const listOfConvertedCurrency = [
    currencyData,
    currencyData,
    currencyData,
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyConverterController],
      providers: [
        {
          provide: CurrencyConverterService,
          useValue: {
            convertCurrency: jest.fn().mockResolvedValue(currencyData),
            getAllConvertions: jest.fn().mockResolvedValue(listOfConvertedCurrency),
          }, 
        },
      ],
    }).compile();

    currencyConvertercontroller = module.get<CurrencyConverterController>(CurrencyConverterController);
    currencyConverterService = module.get<CurrencyConverterService>(CurrencyConverterService)
  });

  it('should be defined', () => {
    expect(currencyConvertercontroller).toBeDefined();
    expect(currencyConverterService).toBeDefined();
  });

  describe('convertCurrency', ()=> {
    it('should converte the currency, save in the bank and return the result', async () => {
      const result = await currencyConvertercontroller.convertCurrency(convertCurrencyData, req);

      expect(result).toEqual(currencyData);
      expect(typeof result).toEqual('object');
      expect(result.convertedAmound).toEqual(result.originalAmount * result.conversionRate);
    });
  });

  describe('getAllConvertions', ()=> {
    it('should get all conversions of an user', async () => {
      const result = await currencyConvertercontroller.getAllConvertions(req);

      expect(result).toEqual(listOfConvertedCurrency);
      expect(typeof result).toEqual('object');
      expect(result.length).toEqual(3);
    });
  });
});
