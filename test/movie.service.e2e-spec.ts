import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MovieService } from '../src/movie/movie.service';
import { EXPECTED_MAX, EXPECTED_MIN } from './dataset/movie.service.dataset';

describe('AppService (Retrieving the response from the main endpoint)', () => {
  let app;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
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