import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ActionTypeNames, EventTypeNames } from "./hook.enums";
import { WebhookType } from "./hooks.models";

@Entity()
export class HookEvent {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @CreateDateColumn()
    eventReceived: Date

    @ApiProperty()
    @UpdateDateColumn()
    eventUpdated: Date

    @ApiProperty()
    @Column()
    hookId: string

    @ApiProperty({ enum: WebhookType })
    @Column()
    hookType: WebhookType

    @ApiProperty({ enum: WebhookType })
    @Column()
    eventType: EventTypeNames

    @ApiProperty({ isArray: true, enum: ActionTypeNames })
    @Column("varchar", { array: true })
    actionTypeNames: ActionTypeNames[]

    @ApiProperty()
    @Column({ default: false })
    validHookType: boolean

    @ApiProperty()
    @Column({ default: false })
    validHmac256: boolean

    @ApiProperty()
    @Column({ default: false })
    actionsTriggered: boolean

}