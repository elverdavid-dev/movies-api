import { Module } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { FavoriteMoviesController } from './favorite-movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteMovie,
  favoriteMovieSchema,
} from './entities/favorite-movie.entity';
import { HandleCacheModule } from '../../utils/handle-cache/handle-cache.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteMovie.name, schema: favoriteMovieSchema },
    ]),
    HandleCacheModule,
  ],
  controllers: [FavoriteMoviesController],
  providers: [FavoriteMoviesService],
})
export class FavoriteMoviesModule {}
