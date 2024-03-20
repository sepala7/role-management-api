import { BadRequestException } from '@nestjs/common';

export class JdbcException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
