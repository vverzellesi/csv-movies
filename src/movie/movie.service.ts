import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as _ from 'lodash';
import { LokijsService } from '../db/lokijs.service';
import { YearIntervalDto } from './dto/get-movies.dto';
import { MoviesResponse } from './movie.controller';

interface ProducersResponse {
    [producer: string]: Movie[];
}

interface Movie {
    year: string;
    title: string;
    studios: string;
    producers: string;
    winner: 'yes' | null;
}

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

    async getProducersInterval(interval?: YearIntervalDto): Promise<MoviesResponse> {
        const movies: Movie[] = _.isEmpty(interval) ?
            await this.lokijsService.findWinnerMovies() :
            await this.lokijsService.findWinnerMoviesWithInterval(interval.startYear, interval.endYear);

        const groupedProducers: _.Dictionary<ProducersResponse[]> = this.groupProducers(movies);

        const results = {
            min: [],
            max: [],
        };

        for (const producer in groupedProducers) {
            if (groupedProducers[producer].length < 2) {
                continue;
            }

            const years = groupedProducers[producer].map(data => Number(data.year));
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

    private groupProducers(movies): _.Dictionary<ProducersResponse[]> {
        const orderedMovies = movies.flatMap(movie => {
            const splittedProducers = movie.producers.split(/, | and |and /).filter(producer => producer);
            return splittedProducers.length > 1 ?
                splittedProducers.map(producer => ({
                    year: movie.year,
                    title: movie.title,
                    studios: movie.studios,
                    producers: producer,
                    winner: movie.winner,
                })) :
                movie;
        });

        return _.groupBy(
            _.orderBy(orderedMovies),
            movie => movie.producers
        );
    }
}
