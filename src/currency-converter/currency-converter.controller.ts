import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorHandling } from '../../config/error-handling';
import { JwtAuthGuard } from '../auth/jwt-aut.guard';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConvertDto } from './dto/converte-currency.dto';

@ApiTags('Conversion Currency')
@Controller('currency-converter')
export class CurrencyConverterController {
  constructor(private readonly currencyConverterService: CurrencyConverterService) {}

  @ApiOperation({ summary: 'Converte a value of money in one currency to another' })
  @ApiBody({ type: CurrencyConvertDto })
  @ApiBearerAuth('Bearer')
  @Post()
  @UseGuards(JwtAuthGuard)
  convertCurrency(@Body() convertDTO: CurrencyConvertDto, @Request() req){
    let { user } = req
    try{
      return this.currencyConverterService.convertCurrency(convertDTO, user.id);
    }catch (error) {
      new ErrorHandling(error);
    } 
  }

  @ApiOperation({ summary: 'Get all convertions done by an user' })
  @ApiBearerAuth('Bearer')
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllConvertions(@Request() req){
    let { user } = req
    try{
      return this.currencyConverterService.getAllConvertions(user.id);
    }catch (error) {
      new ErrorHandling(error);
    } 
  }
}
