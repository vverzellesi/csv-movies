import { IsNumberString, IsOptional, isNumberString } from 'class-validator';

export class YearIntervalDto {
    @IsOptional()
    @IsNumberString()
    startYear: number;

    @IsOptional()
    @IsNumberString()
    endYear: number;
}
