import {
    RealEstateType,
    Tag,
    TradeType,
} from '@libs/naver-land-client/interfaces/naver-land.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ArticleListRequestDto {
    @ApiPropertyOptional({
        type: [RealEstateType],
        title: '매물 종류',
        enum: RealEstateType,
        default: [RealEstateType.APT],
    })
    @IsEnum(RealEstateType, { each: true })
    rletTpCd?: RealEstateType[];

    @ApiProperty({
        type: [TradeType],
        title: '거래 종류',
        enum: TradeType,
        default: [TradeType.매매],
    })
    @IsEnum(TradeType, { each: true })
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

    @ApiProperty({
        type: Number,
        title: '매매가(최소)',
        default: 10000,
    })
    @IsNumber()
    dprcMin?: number;

    @ApiProperty({
        type: Number,
        title: '매매가(최대)',
        default: 38000,
    })
    @IsNumber()
    dprcMax?: number;

    @ApiProperty({
        type: Number,
        title: '공급면적(최소)',
        default: 45,
    })
    @IsNumber()
    spcMin?: number;

    @ApiProperty({
        type: Number,
        title: '공급면적(최대)',
        default: 9999,
    })
    @IsNumber()
    spcMax?: number;

    @ApiProperty({
        type: [String],
        title: '검색 태그',
    })
    @IsString({ each: true })
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
