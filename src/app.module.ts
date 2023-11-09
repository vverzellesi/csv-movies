import { Module } from '@nestjs/common';
import { CsvToJsonService } from './app.service';
import { LokijsService } from './db/lokijs.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule],
  providers: [CsvToJsonService, LokijsService],
})
export class AppModule { }
