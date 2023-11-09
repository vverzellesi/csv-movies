import { Module } from '@nestjs/common';
import { LokijsService } from '../db/lokijs.service';
import { MovieController } from './movie.controller';
import { CsvToJsonService, MovieService } from './movie.service';

@Module({
    controllers: [MovieController],
    providers: [MovieService, LokijsService, CsvToJsonService],
})
export class MovieModule { }
