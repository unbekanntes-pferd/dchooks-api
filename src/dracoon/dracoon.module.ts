import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { HooksService } from './hooks/hooks.service';
import { HooksController } from './hooks/controllers/hooks.controller';
import { ReceiverController } from './hooks/controllers/receiver.controller'
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hook } from './hooks/hook.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActionService } from './hooks/action.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventService } from './hooks/event.service';
import { HookEvent } from './hooks/event.entity';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';

@Module({
  imports: [ 
    ClientsModule.register([{
      name: 'EMAIL_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'email_queue'
      }
    },
    {
      name: 'ROOM_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'room_queue'
      }
    },  
  ]),
     HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      baseURL: configService.get('dracoon.url'),
      validateStatus: function (status: number) {
        return status < 400;
      },
      headers: {
        'User-Agent': 'DC Hooks Service 0.1.0'
      }
    }),
    inject: [ConfigService]
  }), TypeOrmModule.forFeature([Hook, HookEvent])],
  providers: [AuthService, HooksService, ActionService, EventService, RoomsService],
  controllers: [HooksController, ReceiverController, RoomsController]
})
export class DracoonModule {}
