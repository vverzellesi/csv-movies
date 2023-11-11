import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { YearIntervalDto } from './dto/get-movies.dto';
import { MovieService } from './movie.service';

export interface MovieProducerInfo {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface MoviesResponse {
    min: MovieProducerInfo[];
    max: MovieProducerInfo[];
}

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    getMovies(
        @Query(ValidationPipe) query: YearIntervalDto,
    ): Promise<MoviesResponse> {
        return this.movieService.getProducersInterval(query);
    }
}
