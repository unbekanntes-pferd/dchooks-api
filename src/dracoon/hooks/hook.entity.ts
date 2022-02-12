import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Hook {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { array: true, nullable: false })
    eventTypeNames: string[];

    @Column("number", { array: true, nullable: false })
    actionTypeNames: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: false })
    creatorId: number;

}