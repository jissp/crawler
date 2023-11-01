import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'aws_recent_articles',
})
export class AwsRecentArticle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 40,
    })
    guid: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    category: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 40,
        nullable: true,
    })
    author: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    link: string;

    @Column({
        type: 'timestamp',
    })
    pubDate: Date;

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
