import { Module } from '@nestjs/common';
import { SavedMoviesService } from './saved-movies.service';
import { SavedMoviesController } from './saved-movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedMovie, savedMovieSchema } from './entities/saved-movie.entity';
import { HandleCacheModule } from 'src/utils/handle-cache/handle-cache.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavedMovie.name, schema: savedMovieSchema },
    ]),
    HandleCacheModule,
  ],
  controllers: [SavedMoviesController],
  providers: [SavedMoviesService],
})
export class SavedMoviesModule {}
