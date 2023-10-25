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
    // flrInfo;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    price!: number;

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
        type: 'enum',
        enum: Direction,
    })
    direction: Direction;

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

    // tagList: [];

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
