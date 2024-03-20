import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const callerName = context.getHandler().name;
    const targetName = context.getClass().name;
    const request = context.switchToHttp().getRequest();

    this.logger.log(
      `[${targetName}] ${callerName} Request: ${JSON.stringify(request.body)}`,
    );
    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          `[${targetName}] ${callerName} Response: ${JSON.stringify(data)}`,
        );
        return data;
      }),
    );
  }
}
