import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleModuleDto } from '../dto/inputs/create-role-module.dto';
import { RoleModuleService } from '../services/role-module.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('RoleModule')
@Controller('/')
export class RoleModuleController {
  constructor(private readonly roleModuleService: RoleModuleService) {}

  @ApiResponse({
    status: 201,
    description: 'Created. The record has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. The record is already available',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Can not be saved',
  })
  @ApiBody({
    type: CreateRoleModuleDto,
    description: 'Json structure for CreateRoleModuleDto object',
  })
  @Post('/add_permission')
  //@UsePipes(new ValidateCreateRoleModulePipe())
  @UsePipes(new ValidationPipe({ stopAtFirstError: false }))
  async createRolePermission(@Body() createRoleModuleDto: CreateRoleModuleDto) {
    return this.roleModuleService.create(createRoleModuleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get role and module details given a role ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Role and module details not found for the given role ID',
  })
  @Get()
  async getRolePermission(@Query('role_id', ParseIntPipe) roleId: number) {
    return this.roleModuleService.getModuleListByRoleId(roleId);
  }
}
