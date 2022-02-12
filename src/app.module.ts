import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DracoonModule } from './dracoon/dracoon.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Hook } from './dracoon/hooks/hook.entity';

@Module({
  imports: [DracoonModule, ConfigModule.forRoot({
    load: [configuration],
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
      entities: [Hook],
      synchronize: false,
      migrations: ['dist/src/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations'
      }
    }),
    inject: [ConfigService]
  }), 

  HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      baseURL: configService.get('DRACOON_BASE_URL'),
      validateStatus: function (status: number) {
        return status < 400;
      },
      headers: {
        'User-Agent': 'DC Hooks Service 0.1.0'
      }
    }),
    inject: [ConfigService]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
