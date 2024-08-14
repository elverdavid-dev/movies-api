import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';
import { CreateFavoriteMovieDto } from './dto/create-favorite-movie.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('favorite-movies')
@ApiTags('Favorite movies')
export class FavoriteMoviesController {
  constructor(private readonly favoriteMoviesService: FavoriteMoviesService) {}

  @Get(':user_id')
  @ApiCookieAuth()
  @ApiOperation({ summary: "get all a user's favorite movies" })
  @UseGuards(AuthGuard)
  async getFavorites(@Param('user_id') user_id: string) {
    return this.favoriteMoviesService.getFavorites(user_id);
  }

  @Post()
  @ApiCookieAuth()
  @ApiOperation({ summary: 'add a new favorite movie' })
  @UseGuards(AuthGuard)
  async create(@Body() createFavoriteMovieDto: CreateFavoriteMovieDto) {
    return this.favoriteMoviesService.create(createFavoriteMovieDto);
  }

  @Delete(':movie_id')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'delete a favorite movie' })
  @UseGuards(AuthGuard)
  async removeFavorite(
    @Req() req: Request & { user: { user_id: string } },
    @Param('movie_id') movie_id: string,
  ) {
    const user_id = req.user.user_id;
    return this.favoriteMoviesService.removeFavorite(user_id, movie_id);
  }
}
