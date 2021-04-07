import { Provider, Scope } from "@nestjs/common";
import { Redis } from "ioredis";
import * as IORedis from "ioredis";

export namespace REDIS {
  export type TYPE = Redis;

  export const TOKEN = Symbol('REDIS_PROVIDER');

  export const PROVIDER: Provider = {
    provide: TOKEN,
    useFactory: (): TYPE => {
      return new IORedis({
        host: 'localhost',
        port: 6379, 
      });
    },
    
    scope: Scope.TRANSIENT,
  };
}