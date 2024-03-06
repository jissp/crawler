import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
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
        dprcMin: dto.dprcMin ?? 0,
        dprcMax: dto.dprcMax ?? 100000,
        wprcMin: dto.wprcMin ?? 0,
        wprcMax: dto.wprcMax ?? 100000,
        rprcMin: dto.rprcMin ?? 60,
        rprcMax: dto.rprcMax ?? 120,
        spcMin: dto.spcMin ?? 0,
        spcMax: dto.spcMax ?? 90000000,
        tag: dto.tag ?? [ParkingTag.PARKINGYN, HouseHoldTag.HSEH100],
        sort: 'highSpc',
        page: dto.page ?? 1,
        maxPage: dto.maxPage ?? 999,
    };
}
