import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as _ from 'lodash';
import { LokijsService } from '../db/lokijs.service';
import { MoviesResponse } from './movie.controller';

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
export class MovieService {
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

        for (const producer in groupedMovies) {
            if (groupedMovies[producer].length < 2) {
                continue;
            }

            const years = groupedMovies[producer].map(data => Number(data.year));
            const intervals = [];

            for (let i = 1; i < years.length; i++) {
                intervals.push(years[i] - years[i - 1]);
            }

            const minInterval = _.minBy(intervals);
            const maxInterval = _.maxBy(intervals);

            if (results.min.length === 0 || minInterval < results.min[0].interval) {
                results.min = [
                    {
                        producer,
                        interval: minInterval,
                        previousWin: years[intervals.indexOf(minInterval)],
                        followingWin: years[intervals.indexOf(minInterval) + 1],
                    },
                ];
            } else if (minInterval === results.min[0].interval) {
                results.min.push({
                    producer,
                    interval: minInterval,
                    previousWin: years[intervals.indexOf(minInterval)],
                    followingWin: years[intervals.indexOf(minInterval) + 1],
                });
            }

            if (results.max.length === 0 || maxInterval > results.max[0].interval) {
                results.max = [
                    {
                        producer,
                        interval: maxInterval,
                        previousWin: years[intervals.indexOf(maxInterval)],
                        followingWin: years[intervals.indexOf(maxInterval) + 1],
                    },
                ];
            } else if (maxInterval === results.max[0].interval) {
                results.max.push({
                    producer,
                    interval: maxInterval,
                    previousWin: years[intervals.indexOf(maxInterval)],
                    followingWin: years[intervals.indexOf(maxInterval) + 1],
                });
            }

        }

        return results;
    }
}
