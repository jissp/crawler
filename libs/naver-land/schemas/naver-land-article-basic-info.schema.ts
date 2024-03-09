import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { ArticleBasicInfoResult } from "@libs/naver-land-client/clients/dtos/results";

@Entity({
    name: 'naver_land_article_basic_infos',
})
export class NaverLandArticleBasicInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    articleNo!: string;

    @Column({
        type: 'varchar',
        length: 10,
    })
    realEstateType!: string;

    @Column({
        type: 'varchar',
        length: 10,
    })
    tradeType!: TradeType;

    @Column({
        type: 'json',
    })
    data?: ArticleBasicInfoResult | null;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
