import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    NaverLandArticleAdditionalInfoData,
    NaverLandArticleAdditionalInfoType,
} from '@libs/naver-land/interfaces/naver-land-article-additional-info.interface';

@Entity({
    name: 'naver_land_article_additional_infos',
})
export class NaverLandArticleAdditionalInfo<
    T extends NaverLandArticleAdditionalInfoType = any,
> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    type!: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    key!: string;

    @Column({
        type: 'json',
    })
    data?: NaverLandArticleAdditionalInfoData<T> | null;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
