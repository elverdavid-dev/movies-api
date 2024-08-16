import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSavedMovieDto } from './dto/create-saved-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SavedMovie } from './entities/saved-movie.entity';
import { Model } from 'mongoose';
import { HandleCacheService } from 'src/utils/handle-cache/handle-cache.service';
import { messageResponse } from 'src/utils/message-response';

@Injectable()
export class SavedMoviesService {
  constructor(
    @InjectModel(SavedMovie.name) private savedMovieModel: Model<SavedMovie>,
    private readonly cacheService: HandleCacheService,
  ) {}

  async getSavedMovies(user_id: string) {
    const cache_key = `key-${user_id}`;
    // Get movies from cache
    await this.cacheService.getCache(cache_key);

    const movies = await this.savedMovieModel.find({ user_id });

    // Set movies cache
    await this.cacheService.setCache(`key-${user_id}`, movies);

    return movies;
  }

  async create(createSavedMovieDto: CreateSavedMovieDto) {
    const { user_id, movie_id } = createSavedMovieDto;

    const movie = await this.savedMovieModel.findOne({
      user_id,
      movie_id,
    });
    if (movie) {
      throw new ConflictException('This movie is already');
    }
    const newMovie = await this.savedMovieModel.create(createSavedMovieDto);
    await newMovie.save();
    await this.cacheService.resetCache();
    return messageResponse('Movie saved successfully');
  }

  async removeMovie(user_id: string, movie_id: string) {
    const movie = await this.savedMovieModel.findOne({
      movie_id,
      user_id,
    });

    if (!movie) {
      throw new NotFoundException();
    }

    await this.savedMovieModel.deleteOne({ user_id, movie_id });
    await this.cacheService.resetCache();
    return messageResponse('Movie delete successfully');
  }
}
