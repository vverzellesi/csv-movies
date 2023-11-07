import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';


@Injectable()
export class CsvToJsonService implements OnModuleInit {
  async onModuleInit() {
    try {
      Logger.log('Converting CSV file to JSON...');
      const jsonMovies = await csv({ delimiter: ';' }).fromFile('src/data/movielist.csv');
      //TODO: save to db
    } catch (error) {
      throw new Error(`Error converting CSV to JSON: ${error.message}`);
    }
  }
}

@Injectable()
export class AppService {
  async getMovies(): Promise<any[]> {
    return [];
  }
}
