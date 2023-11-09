import { Module } from '@nestjs/common';
import { CsvToJsonService } from '../app.service';
import { LokijsService } from '../db/lokijs.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
    controllers: [MovieController],
    providers: [MovieService, LokijsService, CsvToJsonService],
})
export class MovieModule { }
