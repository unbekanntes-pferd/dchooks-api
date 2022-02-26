import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HookEvent } from "./event.entity";
import { ActionTypeNames, EventTypeNames } from "./hook.enums";
import { WebhookType } from "./hooks.models";


@Injectable()
export class EventService { 

    constructor(@InjectRepository(HookEvent) private eventRepository: Repository<HookEvent>) {}

    addEvent(hookId: string, eventType: EventTypeNames, actionTypeNames: ActionTypeNames[], hookType: WebhookType) {

        const event = this.eventRepository.create({ hookId, eventType, actionTypeNames, hookType });

        return this.eventRepository.save(event);

    }

    getEvents() {

        return this.eventRepository.find();

    }

    getHookEvents(hookId: string) {

        return this.eventRepository.find({ where: { hookId } });

    }

    getEvent(id: number) {
        return this.eventRepository.findOne(id);
    }

    updateValidHookType(event: HookEvent) { 

        event.validHookType = true;

        return this.eventRepository.save(event);

    }

    updateValidHmac256(event: HookEvent) { 

        event.validHmac256 = true;

        return this.eventRepository.save(event);

    }

    updateActionsTriggered(event: HookEvent) { 

        event.actionsTriggered = true;

        return this.eventRepository.save(event);

    }


    async clearEvents() {

        const events = await this.getEvents();

        return this.eventRepository.remove(events);

    }


}
