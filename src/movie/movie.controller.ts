import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

export interface MoviesResponse {
    min: any[],
    max: any[],
}

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    getMovies(): Promise<MoviesResponse> {
        return this.movieService.getMovies();
    }
}
