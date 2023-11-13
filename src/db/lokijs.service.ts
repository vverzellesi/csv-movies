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

    findAllMovies() {
        return this.movies.find();
    }

    findWinnerMovies() {
        return this.movies.chain().find({
            winner: 'yes',
        }).simplesort('year').data();
    }

    findWinnerMoviesWithInterval(startYear: number, endYear: number) {
        return this.movies.chain().find({
            winner: 'yes',
            year: { '$between': [Number(startYear), Number(endYear)] }
        }).simplesort('year').data();
    }

}
