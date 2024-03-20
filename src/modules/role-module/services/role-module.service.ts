import { InjectRepository } from '@nestjs/typeorm';
import { RoleModuleEntity } from '../entities/role-module.entity';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { RoleModuleDto } from '../dto/role-module.dto';
import { RecordNotFoundException } from '../../../core/exceptions/record-not-found.exception';
import { CreateRoleModuleDto } from '../dto/inputs/create-role-module.dto';
import { JdbcException } from '../../../core/exceptions/jdbc.exception';
import { RecordFoundException } from '../../../core/exceptions/record-found.exception';

@Injectable()
export class RoleModuleService {
  private readonly logger = new Logger(RoleModuleService.name);
  constructor(
    @InjectRepository(RoleModuleEntity)
    private readonly roleModuleEntityRepository: Repository<RoleModuleEntity>,
  ) {}

  async create(createRoleModuleDto: CreateRoleModuleDto) {
    try {
      const newRoleModule = this.roleModuleEntityRepository.create({
        ...createRoleModuleDto,
      });

      newRoleModule.role = {
        ...newRoleModule.role,
        id: createRoleModuleDto.roleId,
      };
      newRoleModule.module = {
        ...newRoleModule.module,
        id: createRoleModuleDto.moduleId,
      };

      const findRoleModuleEntity =
        await this.roleModuleEntityRepository.findOneBy({
          module: newRoleModule.module,
          role: newRoleModule.role,
          permission: createRoleModuleDto.permission,
        });

      if (findRoleModuleEntity) {
        throw new RecordFoundException(
          `The record is already available [Module Id:${newRoleModule.module.id} ,Role Id:${newRoleModule.role.id} , permission:${createRoleModuleDto.permission} ]`,
        );
      }

      const roleModuleEntity =
        await this.roleModuleEntityRepository.save(newRoleModule);
      const savedRoleModuleDto: CreateRoleModuleDto = {
        moduleId: roleModuleEntity.module?.id,
        roleId: roleModuleEntity.role.id,
        permission: roleModuleEntity.permission,
      };
      return savedRoleModuleDto;
    } catch (e) {
      this.logger.error(e, e.stack);
      if (e instanceof RecordFoundException) {
        throw e;
      }
      throw new JdbcException(
        `Can not be saved. [sql state code : ${e?.sqlState}]`,
      );
    }
  }

  async getModuleListByRoleId(roleId: number) {
    const list: RoleModuleDto[] = [];
    const roleModuleEntities = await this.roleModuleEntityRepository.findBy({
      role: { id: roleId },
    });
    if (roleModuleEntities.length == 0) {
      throw new RecordNotFoundException(
        `Record Not Found for Role Id ${roleId}`,
      );
    }
    roleModuleEntities.map((value) => {
      list.push({
        moduleId: value.module.id,
        name: value.module.name,
        permission: value.permission,
      });
    });

    return list;
  }
}
