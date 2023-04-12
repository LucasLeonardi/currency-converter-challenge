import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CurrencyConvertDto {
  @ApiProperty()
  @IsNotEmpty()
  fromCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  toCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  originalAmount: number;
}
