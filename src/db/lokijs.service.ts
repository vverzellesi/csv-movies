import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Loki from 'lokijs';

@Injectable()
export class LokijsService implements OnModuleInit {
    private db: Loki;
    private movies;

    onModuleInit() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.db = new Loki('main');
        this.movies = this.db.addCollection('movies');
    }

    createMovies(moviesData: any[]) {
        return this.movies.insert(moviesData);
    }

    findMovies() {
        return this.movies.find();
    }
}
