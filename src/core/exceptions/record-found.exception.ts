
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';

export class RecordFoundException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
