import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteMovieDto } from './create-favorite-movie.dto';

export class UpdateFavoriteMovieDto extends PartialType(
  CreateFavoriteMovieDto,
) {}
