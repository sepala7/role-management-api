import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('Role Access Management API')
  .setDescription('Role Access Management API')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .build();
