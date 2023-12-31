/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

export const protobufPackage = 'tile';

export const TILE_PACKAGE_NAME = 'tile';

export interface TileServiceClient {}

export interface TileServiceController {}

export function TileServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('TileService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('TileService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const TILE_SERVICE_NAME = 'TileService';
