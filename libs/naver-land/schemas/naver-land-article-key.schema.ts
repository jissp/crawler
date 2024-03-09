import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleKeyResult } from '@libs/naver-land-client/clients/dtos/results/article-key.result';

@Entity({
    name: 'naver_land_article_keys',
})
export class NaverLandArticleKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    articleNo!: string;

    @Column({
        type: 'json',
    })
    data?: ArticleKeyResult | null;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
