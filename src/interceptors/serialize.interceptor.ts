import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstrucror {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstrucror) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: any) => {
        if (typeof data !== 'object' || data === null) {
          return data;
        }

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
