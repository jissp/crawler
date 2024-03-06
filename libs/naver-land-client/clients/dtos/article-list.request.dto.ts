import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
    ParkingTag,
    RealEstateType,
    Tag,
    TradeType,
} from '@libs/naver-land-client/interfaces/naver-land.interface';

export class ArticleListRequestDto {
    @ApiPropertyOptional({
        type: [RealEstateType],
        title: '매물 종류',
        enum: RealEstateType,
        default: [
            RealEstateType.아파트,
            RealEstateType.오피스텔,
            RealEstateType['단독/다가구'],
            RealEstateType.전원주택,
        ],
    })
    @IsEnum(RealEstateType, { each: true })
    @IsOptional()
    rletTpCd?: RealEstateType[];

    @ApiProperty({
        type: [TradeType],
        title: '거래 종류',
        enum: TradeType,
        default: [TradeType.매매, TradeType.전세, TradeType.월세],
    })
    @IsEnum(TradeType, { each: true })
    @IsOptional()
    tradTpCd?: TradeType[];

    @ApiProperty({
        type: Number,
        title: 'Zoom',
        default: 12,
    })
    @IsNumber()
    z: number;

    @ApiProperty({
        type: Number,
        title: '위도',
        default: 37.5030847,
    })
    @IsNumber()
    lat: number;

    @ApiProperty({
        type: Number,
        title: '경도',
        default: 126.996848,
    })
    @IsNumber()
    lon: number;

    @ApiProperty({
        type: Number,
        title: '',
        default: 37.4390515,
    })
    @IsNumber()
    btm: number;

    @ApiProperty({
        type: Number,
        title: '',
        default: 126.832053,
    })
    @IsNumber()
    lft: number;

    @ApiProperty({
        type: Number,
        title: '',
        default: 37.567063,
    })
    @IsNumber()
    top: number;

    @ApiProperty({
        type: Number,
        title: '',
        default: 127.1616429,
    })
    @IsNumber()
    rgt: number;

    @ApiPropertyOptional({
        type: Number,
        title: '매매가(최소)',
        default: 10000,
    })
    @IsNumber()
    @IsOptional()
    dprcMin?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '매매가(최대)',
        default: 38000,
    })
    @IsNumber()
    @IsOptional()
    dprcMax?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '전세가(최소)',
        default: 10000,
    })
    @IsNumber()
    @IsOptional()
    wprcMin?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '전세가(최대)',
        default: 20000,
    })
    @IsNumber()
    @IsOptional()
    wprcMax?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '월세(최소)',
        default: 70,
    })
    @IsNumber()
    @IsOptional()
    rprcMin?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '월세(최대)',
        default: 120,
    })
    @IsNumber()
    @IsOptional()
    rprcMax?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '공급면적(최소)',
        default: 45,
    })
    @IsNumber()
    @IsOptional()
    spcMin?: number;

    @ApiPropertyOptional({
        type: Number,
        title: '공급면적(최대)',
        default: 9999,
    })
    @IsNumber()
    @IsOptional()
    spcMax?: number;

    @ApiPropertyOptional({
        type: [String],
        title: '검색 태그',
        default: [ParkingTag.PARKINGYN],
    })
    @IsString({ each: true })
    @IsOptional()
    tag?: Tag[];
    sort: 'highSpc';

    @ApiProperty({
        type: Number,
        title: '페이지 번호',
        default: 1,
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        type: Number,
        title: '검색 최대 페이지 번호',
        default: 1,
    })
    @IsNumber()
    maxPage?: number;
}
