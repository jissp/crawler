import { Test } from '@nestjs/testing';
import { StartedTestContainer } from 'testcontainers';
import { loadDatabaseContainer } from '@libs/utils/test/load-database-container';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Coord2addressService } from '@libs/coord2address/services/coord2address.service';
import { Coord2addressModule } from '@libs/coord2address/coord2address.module';

describe('Crawler Save Test', () => {
    let databaseContainer: StartedTestContainer;

    let coord2addressService: Coord2addressService;

    beforeAll(async () => {
        const dbConfig = {
            databaseName: 'test',
            user: 'test',
            password: 'test',
        };

        databaseContainer = await loadDatabaseContainer(dbConfig).start();

        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    database: dbConfig.databaseName,
                    username: dbConfig.user,
                    password: dbConfig.password,
                    host: databaseContainer.getHost(),
                    port: databaseContainer.getMappedPort(3306),
                    synchronize: false,
                    autoLoadEntities: true,
                    namingStrategy: new SnakeNamingStrategy(),
                }),
                Coord2addressModule,
            ],
        }).compile();

        coord2addressService =
            moduleRef.get<Coord2addressService>(Coord2addressService);
    });

    afterAll(async () => {
        await databaseContainer.stop();
    });

    it('위도, 경도를 이용해서 주소를 조회한다. (API 호출)', async () => {
        const coord = await coord2addressService.getAddressByCoord({
            lat: 37.5030847,
            lng: 126.996848,
        });

        expect(coord.data.address.address_name).toBe('서울 서초구 반포동 18-1');
    });

    it('DB에서 위도, 경도를 이용해서 주소를 조회한다. (DB 조회)', async () => {
        const coord = await coord2addressService.findAddressByCoord({
            lat: 37.5030847,
            lng: 126.996848,
        });

        expect(coord.data.address.address_name).toBe('서울 서초구 반포동 18-1');
    });
});
