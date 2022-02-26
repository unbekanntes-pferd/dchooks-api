import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ActionTypeNames, EventTypeNames } from "./hook.enums";
import { WebhookType } from "./hooks.models";

@Entity()
export class Hook {

    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({ enum: WebhookType })
    @Column()
    hookType: WebhookType

    @ApiProperty({ enum: EventTypeNames })
    @Column("varchar", { nullable: false })
    eventTypeName: EventTypeNames;

    @ApiProperty({ enum: ActionTypeNames, isArray: true })
    @Column("varchar", { array: true, nullable: false })
    actionTypeNames: ActionTypeNames[];

    @ApiProperty()
    @Column({ nullable: true })
    secret: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @Column({ nullable: false })
    creatorId: number;

    @ApiProperty()
    @Column({ unique: true, nullable: true })
    dracoonWebhookId: number;

}