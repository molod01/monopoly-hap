import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    SeedModule,
    new FastifyAdapter(),
  );

  // run

  await app.close();
};

runSeed();
