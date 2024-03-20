import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleModuleEntity } from './role-module.entity';

@Entity({ name: 'module' })
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(
    () => RoleModuleEntity,
    (roleModuleEntity: RoleModuleEntity) => roleModuleEntity.module,
  )
  roleModules: RoleModuleEntity[];
}
