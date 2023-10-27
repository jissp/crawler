import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IDocument } from '@libs/kakao/api/local/interfaces/kakao-local-api.interface';

@Entity({
    name: 'coords',
})
export class Coord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 13,
        scale: 10,
    })
    latitude!: number;

    @Column({
        type: 'decimal',
        precision: 13,
        scale: 10,
    })
    longitude!: number;

    @Column({
        type: 'json',
    })
    data!: IDocument;

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
