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

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @InjectModel(FavoriteMovie.name)
    private favoriteMovieModel: Model<FavoriteMovie>,
  ) {}

  async getFavorites(user_id: string) {
    return await this.favoriteMovieModel.find({ user_id });
  }

  async create(createFavoriteMovieDto: CreateFavoriteMovieDto) {
    const { user_id, movie_id } = createFavoriteMovieDto;

    const existingFavorite = await this.favoriteMovieModel.findOne({
      user_id,
      movie_id,
    });
    if (!existingFavorite) {
      throw new ConflictException('This movie is already in favorites');
    }
    const newFavoriteMovie = await this.favoriteMovieModel.create(
      createFavoriteMovieDto,
    );
    await newFavoriteMovie.save();

    return messageResponse('Favorite movie saved successfully');
  }

  async removeFavorite(user_id: string, movie_id: string) {
    const existingFavorite = await this.favoriteMovieModel.findOne({
      movie_id,
      user_id,
    });

    if (!existingFavorite) {
      throw new NotFoundException();
    }

    await this.favoriteMovieModel.deleteOne({ user_id, movie_id });

    return messageResponse('favorite movie delete successfully');
  }
}
