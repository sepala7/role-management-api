import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { ModuleEntity } from './module.entity';

@Entity({ name: 'role_module' })
export class RoleModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  permission: number;
  @ManyToOne(() => RoleEntity, (role) => role.roles)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => ModuleEntity, (module: ModuleEntity) => module.roleModules, {
    eager: true,
  })
  @JoinColumn({ name: 'module_id' })
  module: ModuleEntity;
}
