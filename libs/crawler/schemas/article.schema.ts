import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';

@Entity({
    name: 'articles',
})
export class Article {
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
    updatedAt!: Date;
}
