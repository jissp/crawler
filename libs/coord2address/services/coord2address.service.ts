import { Injectable } from '@nestjs/common';
import { KakaoLocalApiClient } from '@libs/kakao/api/local/kakao-local-api.client';
import { Repository } from 'typeorm';
import { Coord } from '@libs/coord2address/schemas/coord.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Coord2addressService {
    constructor(
        private readonly kakaoLocalApiClient: KakaoLocalApiClient,
        @InjectRepository(Coord)
        private readonly coordRepository: Repository<Coord>,
    ) {}

    async getAddressByCoord({
        lat,
        lng,
    }: {
        lat: number;
        lng: number;
    }): Promise<Coord | null> {
        const coord = await this.findAddressByCoord({ lat, lng });
        if (coord) {
            return coord;
        }

        const address = await this.kakaoLocalApiClient.getAddressByCoord2({
            lat: lat,
            long: lng,
        });

        return this.coordRepository.save({
            latitude: lat,
            longitude: lng,
            data: address.documents[0],
        });
    }

    async findAddressByCoord({ lat, lng }: { lat: number; lng: number }) {
        return this.coordRepository.findOneBy({
            latitude: lat,
            longitude: lng,
        });
    }
}
