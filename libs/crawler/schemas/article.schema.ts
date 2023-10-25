import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';
import { IArticleSchema } from '@libs/crawler/interfaces/article.schema.interface';

@Entity({
    name: 'articles',
})
export class Article implements IArticleSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: CrawlerType,
        nullable: false,
    })
    type!: CrawlerType;

    @Column({
        type: 'varchar',
        length: 50,
    })
    no!: string;

    @Column({
        type: 'json',
    })
    data!: any;

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
