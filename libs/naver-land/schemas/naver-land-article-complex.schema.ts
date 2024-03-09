import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleComplexResult } from '@libs/naver-land-client/clients/dtos/results';

@Entity({
    name: 'naver_land_article_complexes',
})
export class NaverLandArticleComplex {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        unsigned: true,
    })
    complexNo!: number;

    @Column({
        type: 'json',
    })
    data?: ArticleComplexResult | null;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
