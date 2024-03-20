import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleModuleEntity } from './role-module.entity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(
    () => RoleModuleEntity,
    (roleModuleEntity) => roleModuleEntity.role,
  )
  roles: RoleModuleEntity[];
}
