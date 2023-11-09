import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { YearIntervalDto } from './dto/get-movies.dto';
import { MovieService } from './movie.service';

export interface MoviesResponse {
    min: any[],
    max: any[],
}

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    getMovies(
        @Query(ValidationPipe) query: YearIntervalDto,
    ): Promise<MoviesResponse> {
        return this.movieService.getMovies(query);
    }
}
