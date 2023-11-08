import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export interface MoviesResponse {
  min: any[],
  max: any[],
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getMovies(): Promise<MoviesResponse> {
    return this.appService.getMovies();
  }
}
