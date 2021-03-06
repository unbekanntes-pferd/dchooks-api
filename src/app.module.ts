import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DracoonModule } from './dracoon/dracoon.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/configuration';
import { Hook } from './dracoon/hooks/hook.entity';
import { HookEvent } from './dracoon/hooks/event.entity';

@Module({
  imports: [DracoonModule, 
    ConfigModule.forRoot({
    load: [config],
    isGlobal: true
  }), 

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      type: "postgres",
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.database'),
      entities: [Hook, HookEvent],
      synchronize: false,
      migrations: ['dist/src/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations'
      }
    }),
    inject: [ConfigService]
  }), 

],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
