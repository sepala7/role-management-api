import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateRoleModuleDto } from '../dto/inputs/create-role-module.dto';

export class ValidateCreateRoleModulePipe implements PipeTransform<any> {
  transform(value: CreateRoleModuleDto): any {
    if (value == null) {
      throw new BadRequestException('Required values are missing');
    }
    if (!value.moduleId) {
      throw new BadRequestException('Module Id (moduleId) cannot be empty.');
    }

    if (!value.roleId) {
      throw new BadRequestException('Role Id (roleId) cannot be empty.');
    }

    if (!value.permission) {
      throw new BadRequestException('Permission (moduleId) cannot be empty.');
    }

    return value;
  }
}
