import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, CsvToJsonService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CsvToJsonService],
})
export class AppModule { }
