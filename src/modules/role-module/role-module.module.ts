import { Module } from '@nestjs/common';
import { RoleModuleController } from './controllers/role-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ModuleEntity } from './entities/module.entity';

import { RoleModuleEntity } from './entities/role-module.entity';
import { RoleModuleService } from './services/role-module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, ModuleEntity, RoleModuleEntity]),
  ],
  controllers: [RoleModuleController],
  providers: [RoleModuleService],
})
export class RoleModuleModule {}
