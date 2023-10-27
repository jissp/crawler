import { Module } from '@nestjs/common';
import { KakaoLocalApiModule } from '@libs/kakao/api/local/kakao-local-api.module';
import { Coord2addressService } from '@libs/coord2address/services/coord2address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coord } from '@libs/coord2address/schemas/coord.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Coord]), KakaoLocalApiModule],
    providers: [Coord2addressService],
    exports: [Coord2addressService],
})
export class Coord2addressModule {}
