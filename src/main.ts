import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const url =
    `${process.env.APP_IP}:${process.env.APP_PORT}` || '0.0.0.0:50001';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url,
        package: [],
        protoPath: [],
        loader: {
          keepCase: false,
          longs: String,
          oneofs: true,
          defaults: true,
        },
      },
    },
  );

  app.useLogger(app.get(Logger));
  await app.listen();
  console.log('Microservice is listening', url);
}
bootstrap();
