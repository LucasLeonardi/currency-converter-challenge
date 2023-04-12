import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConverterRepository } from './currency-converter.repository';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConvertDto } from './dto/converte-currency.dto';
import { CurrencyConverter } from './entities/currency-converter.entity';

describe('CurrencyConverterService', () => {
  let currencyConverterService: CurrencyConverterService;
  let currencyConverterRepository: CurrencyConverterRepository;

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

  const convertCurrencyDB = {
    userId: "1",
    fromCurrency: 'BRL',
    originalAmount: 100,
    toCurrency: 'USD',
    conversionRate: 2,
    date: 'Thu, 16 Mar 2023 22:48:39 GMT',
    id: '1',
  }

  const convertCurrencyReturn = {
    userId: "1",
    fromCurrency: "BRL",
    originalAmount: 100,
    toCurrency: "USD",
    conversionRate: 2,
    date: "Thu, 16 Mar 2023 22:48:39 GMT",
    id: "1",
    convertedAmound: 9.56,
  }

  const listOfConvertedCurrency = [
    convertCurrencyDB,
    convertCurrencyDB,
    convertCurrencyDB,
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyConverterService,
        {
          provide: CurrencyConverterRepository,
          useValue: {
            getAllByUserId: jest.fn().mockResolvedValue(listOfConvertedCurrency),
            createCurrency: jest.fn().mockResolvedValue(convertCurrencyDB),
          }, 
        },
      ],
    }).compile();

    currencyConverterService = module.get<CurrencyConverterService>(CurrencyConverterService);
    currencyConverterRepository = module.get<CurrencyConverterRepository>(CurrencyConverterRepository)
  });

  it('should be defined', () => {
    expect(currencyConverterService).toBeDefined();
    expect(currencyConverterRepository).toBeDefined();
  });

  describe('convertCurrency', ()=> {
    it('should convert the curency, save in DB and return result', async () => {
      const result = await currencyConverterService.convertCurrency(convertCurrencyData, req.user.id);
      expect(result).toEqual(convertCurrencyReturn);
      expect(currencyConverterRepository.createCurrency).toBeCalledTimes(1)
    });
  });

  describe('getAllConvertions', ()=> {
    it('should get all conversions done by an user', async () => {
      const result = await currencyConverterService.getAllConvertions(req.user.id);
      expect(result).toEqual(listOfConvertedCurrency);
      expect(currencyConverterRepository.getAllByUserId).toBeCalledTimes(1)
    });
  });
});
