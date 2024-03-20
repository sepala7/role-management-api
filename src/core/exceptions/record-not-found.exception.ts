import { NotFoundException } from '@nestjs/common';

export class RecordNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
