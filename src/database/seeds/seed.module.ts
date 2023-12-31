import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import elasticConfig from '../../config/elastic.config';
import { validate } from '../../utils/validators/environment.validator';
import { RealtySeedModule } from './realty/realty.module';
import { TypeOrmConfigService } from '../typeorm-config.service';
import databaseConfig from '../../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [elasticConfig, databaseConfig],
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    RealtySeedModule,
  ],
})
export class SeedModule {}
