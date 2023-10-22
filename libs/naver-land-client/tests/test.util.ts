import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import {
    HouseHoldTag,
    ParkingTag,
} from '@libs/naver-land-client/interfaces/naver-land.interface';

export function baseNaverLandRequestDto(
    dto: Partial<ArticleListRequestDto>,
): ArticleListRequestDto {
    return {
        rletTpCd: dto.rletTpCd ?? [],
        tradTpCd: dto.tradTpCd ?? [],
        z: dto.z,
        lat: dto.lat,
        lon: dto.lon,
        btm: dto.btm,
        lft: dto.lft,
        top: dto.top,
        rgt: dto.rgt,
        dprcMin: 0,
        dprcMax: 100000,
        spcMin: 0,
        spcMax: 90000000,
        tag: dto.tag ?? [ParkingTag.PARKINGYN, HouseHoldTag.HSEH100],
        sort: 'highSpc',
        page: dto.page ?? 1,
        maxPage: dto.maxPage ?? 999,
    };
}
