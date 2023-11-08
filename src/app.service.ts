import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';
import { LokijsService } from './db/lokijs.service';


@Injectable()
export class CsvToJsonService implements OnModuleInit {
  constructor(
    private readonly lokijsService: LokijsService,
  ) { }

  async onModuleInit() {
    try {
      Logger.log('Converting CSV file to JSON...');
      const jsonMovies = await csv({ delimiter: ';' }).fromFile('src/data/movielist.csv');
      this.lokijsService.createMovies(jsonMovies);
    } catch (error) {
      throw new Error(`Error converting CSV to JSON: ${error.message}`);
    }
  }
}

@Injectable()
export class AppService {
  constructor(
    private readonly lokijsService: LokijsService,
  ) { }

  async getMovies(): Promise<any[]> {
    return this.lokijsService.findMovies();
  }
}
