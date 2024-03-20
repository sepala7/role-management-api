import { Module } from '@nestjs/common';
import { RoleModuleModule } from './modules/role-module/role-module.module';
import { ConfigModule } from '@nestjs/config';
import { MysqlDatabaseConfigModule } from './database/mysql-database-config/mysql-database-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoleModuleModule,
    MysqlDatabaseConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
