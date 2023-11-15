import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RealEstateTypeName } from '@libs/naver-land-client/interfaces/article.interface';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchNaverLandRequestDto {
    @ApiPropertyOptional({
        type: [TradeType],
        description: '거래 유형',
        enum: TradeType,
        isArray: true,
    })
    @IsEnum(TradeType, { each: true })
    @IsOptional()
    tradTpCd!: TradeType[];

    @ApiPropertyOptional({
        type: [RealEstateTypeName],
        description: '매물 유형',
        enum: RealEstateTypeName,
        isArray: true,
    })
    @IsEnum(RealEstateTypeName, { each: true })
    @IsOptional()
    rletTpNm!: RealEstateTypeName[];

    @ApiPropertyOptional({
        description: '공급 면적(최소)',
        example: 60,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    spc1Min?: number;

    @ApiPropertyOptional({
        description: '공급 면적(최대)',
        default: 99999,
        example: 99999,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    spc1Max?: number;

    @ApiPropertyOptional({
        description: '전용 면적(최소)',
        example: 33,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    spc2Min?: number;

    @ApiPropertyOptional({
        description: '전용 면적(최대)',
        example: 99999,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    spc2Max?: number;

    @ApiPropertyOptional({
        description: '방 갯수(최소)',
        example: 2,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    roomCountMin?: number;

    @ApiPropertyOptional({
        description: '방 갯수(최대)',
        example: 3,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    roomCountMax?: number;

    @ApiProperty({
        type: Number,
        description: '페이지',
        default: 1,
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    page!: number;

    @ApiProperty({
        type: Number,
        description: '페이지 사이즈',
        default: 20,
        example: 20,
    })
    @Type(() => Number)
    @IsNumber()
    pageSize!: number;
}
