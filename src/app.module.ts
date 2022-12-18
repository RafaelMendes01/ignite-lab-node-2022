import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { httpModule } from './infra/http/httpModule';


@Module({
  imports: [httpModule, DatabaseModule]
})
export class AppModule {}
