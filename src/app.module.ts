import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, CsvToJsonService } from './app.service';
import { LokijsService } from './db/lokijs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CsvToJsonService, LokijsService],
})
export class AppModule { }
