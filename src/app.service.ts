import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as _ from 'lodash';
import { MoviesResponse } from './app.controller';
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

  async getMovies(): Promise<MoviesResponse> {
    const movies = await this.lokijsService.findWinnerMovies();
    const groupedMovies = _.groupBy(movies, movie => movie.producers);
    const results = {
      min: [],
      max: [],
    };

    let minInterval = Number.MAX_SAFE_INTEGER;

    for (const producer in groupedMovies) {
      if (groupedMovies[producer].length < 2) {
        continue;
      }

      const years = groupedMovies[producer].map(data => Number(data.year));
      const intervals = [];

      for (let i = 1; i < years.length; i++) {
        intervals.push(years[i] - years[i - 1]);
      }

      const minProducerInterval = Math.min(...intervals);

      if (minProducerInterval < minInterval) {
        minInterval = minProducerInterval;
      }

      if (minProducerInterval === minInterval) {
        results.min.push({
          producer,
          interval: minProducerInterval,
          previousWin: years[intervals.indexOf(minProducerInterval)],
          followingWin: years[intervals.indexOf(minProducerInterval) + 1],
        });
      }
    }

    return results;
  }
}
