import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as _ from 'lodash';
import { LokijsService } from '../db/lokijs.service';
import { YearIntervalDto } from './dto/get-movies.dto';
import { MovieProducerInfo, MoviesResponse } from './movie.controller';

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

            const occurrences = _.countBy(intervals);
            const minOccurrences = occurrences[minInterval];
            const maxOccurrences = occurrences[maxInterval];

            for (let i = 0; i < minOccurrences; i++) {
                results.min = this.updateIntervalResult(results.min, producer, minInterval, years, intervals, true);
            }
            for (let i = 0; i < maxOccurrences; i++) {
                results.max = this.updateIntervalResult(results.max, producer, maxInterval, years, intervals, false);
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

    private updateIntervalResult(
        results: MovieProducerInfo[],
        producer: string,
        interval: number,
        years: number[],
        intervals: number[],
        isMin: boolean): MovieProducerInfo[] {
        if (results.length === 0 || (isMin ? interval < results[0].interval : interval > results[0].interval)) {
            results = [{
                producer,
                interval,
                previousWin: years[intervals.indexOf(interval)],
                followingWin: years[intervals.indexOf(interval) + 1],
            }];
        } else if (interval === results[0].interval) {
            results.push({
                producer,
                interval,
                previousWin: years[intervals.indexOf(interval)],
                followingWin: years[intervals.indexOf(interval) + 1],
            });
        }
        return results;
    }
}
