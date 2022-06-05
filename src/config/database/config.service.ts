import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DBHOST'),
      port: +this.config.get<number>('DBPORT'),
      database: this.config.get<string>('DBNAME'),
      username: this.config.get<string>('DBUSER'),
      password: this.config.get<string>('DBPWD'),
      entities: [this.config.get<string>('ENTITY_PATH')],
      synchronize: false,
      keepConnectionAlive: true,
      logging: true,
    };
  }
}
