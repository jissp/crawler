import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    Direction,
    RealEstateTypeName,
} from '@libs/naver-land-client/interfaces/article.interface';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
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

    @ApiPropertyOptional({
        type: String,
        description: '지역1',
        example: '서울',
    })
    @IsString()
    @IsOptional()
    region1?: string;

    @ApiPropertyOptional({
        type: String,
        description: '지역2',
        example: '강남구',
    })
    @IsString()
    @IsOptional()
    region2?: string;

    @ApiPropertyOptional({
        type: String,
        description: '지역3',
        example: '역삼동',
    })
    @IsString()
    @IsOptional()
    region3?: string;

    @ApiPropertyOptional({
        type: String,
        isArray: true,
        description: '방향',
        enum: Direction,
        example: [Direction.남향, Direction.남동향],
    })
    @IsString({
        each: true,
    })
    @IsOptional()
    direction?: Direction[];

    @ApiPropertyOptional({
        type: Number,
        description: '사용승인일(최소)',
        example: 2,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    completionYearMin?: number;

    @ApiPropertyOptional({
        type: Number,
        description: '사용승인일(최대)',
        example: 30,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    completionYearMax?: number;

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
