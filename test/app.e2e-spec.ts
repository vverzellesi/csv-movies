import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { LokijsService } from '../src/db/lokijs.service';
import { EXPECTED_MAX, EXPECTED_MIN, MOVIES_JSON_DATA } from './dataset/app.service.dataset';
import { MovieService } from '../src/movie/movie.service';

describe('AppService (Retrieving the response from the main endpoint)', () => {
  let app;
  let lokijsService: LokijsService;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    lokijsService = moduleFixture.get<LokijsService>(LokijsService);
    lokijsService.findWinnerMovies = jest.fn().mockReturnValue(MOVIES_JSON_DATA);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return valid results for getMovies', async () => {
    const movieService = moduleFixture.get<MovieService>(MovieService);
    const response = await movieService.getMovies();

    expect(response).toBeDefined();
    expect(response.min).toEqual(EXPECTED_MIN);
    expect(response.max).toEqual(EXPECTED_MAX);
  });
});