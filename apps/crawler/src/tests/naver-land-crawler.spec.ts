import { Test } from '@nestjs/testing';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';
import { ConfigModule } from '@libs/config/config.module';
import { ConfigService } from '@libs/config/services/config.service';
import {
    ParkingTag,
    RealEstateType,
    TradeType,
} from '@libs/naver-land-client/interfaces/naver-land.interface';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';

describe('NaverLandCrawler', () => {
    let naverLandCrawler: NaverLandCrawler;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: async (configService: ConfigService) =>
                        configService.getDatabaseConfig(),
                }),
                NaverLandCrawlerModule,
            ],
            providers: [],
            exports: [],
        }).compile();

        naverLandCrawler = moduleRef.get<NaverLandCrawler>(NaverLandCrawler);
    });

    const rletTpCd = [RealEstateType.아파트, RealEstateType.오피스텔];
    const tradTpCd = [TradeType.매매, TradeType.월세];
    const dprcMin = 20000;
    const dprcMax = 40000;
    const wprcMin = 4000;
    const wprcMax = 15000;
    const rprcMin = 60;
    const rprcMax = 100;
    const spcMin = 44;

    const list: {
        [key: string]: ArticleListRequestDto;
    } = {
        '강남 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 13,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.5030847,
            lon: 126.996848,
            btm: 37.4390515,
            lft: 126.832053,
            top: 37.567063,
            rgt: 127.1616429,
        }),
        '강북 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.5490321,
            lon: 126.9935435,
            btm: 37.5170421,
            lft: 126.911146,
            top: 37.5810084,
            rgt: 127.075941,
        }),
        '강서, 마포, 영등포, 선유도, 당산, 여의도 지역':
            baseNaverLandRequestDto({
                rletTpCd,
                tradTpCd,
                z: 14,
                dprcMin,
                dprcMax,
                wprcMin,
                wprcMax,
                rprcMin,
                rprcMax,
                spcMin,
                lat: 37.5470586,
                lon: 126.8909544,
                btm: 37.5150678,
                lft: 126.8337482,
                top: 37.5790358,
                rgt: 126.9481605,
            }),
        '역곡/부천 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.5053997,
            lon: 126.8732089,
            btm: 37.473391,
            lft: 126.7908114,
            top: 37.5373948,
            rgt: 126.9556063,
        }),
        '독산/광명 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.4620825,
            lon: 126.9333762,
            btm: 37.4300552,
            lft: 126.8509787,
            top: 37.4940961,
            rgt: 127.0157736,
        }),
        '평촌, 과천 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.4161156,
            lon: 127.0023626,
            btm: 37.3840686,
            lft: 126.9199651,
            top: 37.4481489,
            rgt: 127.0847601,
        }),
        '강동, 하남 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.5444386,
            lon: 127.1595186,
            btm: 37.5124466,
            lft: 127.0771211,
            top: 37.5764169,
            rgt: 127.241916,
        }),
        '수서, 위례 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.4761497,
            lon: 127.1307653,
            btm: 37.4441284,
            lft: 127.0483678,
            top: 37.5081573,
            rgt: 127.2131628,
        }),
        '판교 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.3986619,
            lon: 127.1098226,
            btm: 37.3666075,
            lft: 127.0274252,
            top: 37.4307027,
            rgt: 127.1922201,
        }),
        '수지, 광교 지역': baseNaverLandRequestDto({
            rletTpCd,
            tradTpCd,
            z: 14,
            dprcMin,
            dprcMax,
            wprcMin,
            wprcMax,
            rprcMin,
            rprcMax,
            spcMin,
            lat: 37.3058028,
            lon: 127.0758337,
            btm: 37.2737087,
            lft: 127.0186275,
            top: 37.3378832,
            rgt: 127.1330398,
        }),
        단독주택: baseNaverLandRequestDto({
            rletTpCd: [RealEstateType['단독/다가구'], RealEstateType.전원주택],
            z: 12,
            dprcMin,
            dprcMax,
            spcMin,
            lat: 37.5385348,
            lon: 127.0896417,
            btm: 37.4667662,
            lft: 126.7600518,
            top: 37.6102343,
            rgt: 127.4192315,
            tag: [ParkingTag.PARKINGYN],
        }),
    };

    describe('', () => {});
    it('네이버 매물 수집', async () => {
        const regions = Object.keys(list);
        for (const region of regions) {
            console.log(region);

            const requestDto = list[region];

            await naverLandCrawler.run(requestDto);
        }
    });
});
