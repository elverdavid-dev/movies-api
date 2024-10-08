import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteMovieDto } from './dto/create-favorite-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FavoriteMovie } from './entities/favorite-movie.entity';
import { Model } from 'mongoose';
import { messageResponse } from 'src/utils/message-response';
import { HandleCacheService } from '../../utils/handle-cache/handle-cache.service';

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @InjectModel(FavoriteMovie.name)
    private favoriteMovieModel: Model<FavoriteMovie>,
    private readonly cacheService: HandleCacheService,
  ) {}

  async getFavoriteMovies(user_id: string) {
    const cache_key = `key-${user_id}`;
    // Get movies from cache
    await this.cacheService.getCache(cache_key);

    const movies = await this.favoriteMovieModel.find({ user_id });

    // Set movies cache
    await this.cacheService.setCache(`key-${user_id}`, movies);

    return movies;
  }

  async create(createFavoriteMovieDto: CreateFavoriteMovieDto) {
    const { user_id, movie_id } = createFavoriteMovieDto;

    const movie = await this.favoriteMovieModel.findOne({
      user_id,
      movie_id,
    });
    if (movie) {
      throw new ConflictException('This movie is already');
    }
    const newMovie = await this.favoriteMovieModel.create(
      createFavoriteMovieDto,
    );
    await newMovie.save();
    await this.cacheService.resetCache();
    return messageResponse('Movie saved successfully');
  }

  async removeMovie(user_id: string, movie_id: string) {
    const movie = await this.favoriteMovieModel.findOne({
      movie_id,
      user_id,
    });

    if (!movie) {
      throw new NotFoundException();
    }

    await this.favoriteMovieModel.deleteOne({ user_id, movie_id });
    await this.cacheService.resetCache();
    return messageResponse('Movie delete successfully');
  }
}
