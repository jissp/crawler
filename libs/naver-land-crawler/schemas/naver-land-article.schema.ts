import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    Direction,
    RealEstateTypeName,
} from '@libs/naver-land-client/interfaces/article.interface';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';

@Entity({
    name: 'naver_land_articles',
})
export class NaverLandArticle implements INaverLandArticleSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    articleNo!: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    atclNm!: string;

    @Column({
        type: 'enum',
        enum: RealEstateTypeName,
    })
    rletTpNm: RealEstateTypeName;

    @Column({
        type: 'enum',
        enum: TradeType,
    })
    tradTpCd: TradeType;

    @Column({
        type: 'varchar',
        length: 20,
    })
    region1: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    region2: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    region3: string;

    @Column({
        type: 'integer',
        unsigned: true,
    })
    price!: number;

    @Column({
        type: 'integer',
        unsigned: true,
    })
    rentPrice!: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    spc1!: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    spc2!: number;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
    })
    spcRatio: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    roomCount!: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    floor!: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    maxFloor!: number;

    @Column({
        type: 'enum',
        enum: Direction,
    })
    direction: Direction;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    completionYear!: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    lat!: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    lng!: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: null,
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date | null;
}
