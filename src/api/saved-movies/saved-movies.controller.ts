import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SavedMoviesService } from './saved-movies.service';
import { CreateSavedMovieDto } from './dto/create-saved-movie.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('saved-movies')
@ApiTags('Saved Movies')
export class SavedMoviesController {
  constructor(private readonly savedMoviesService: SavedMoviesService) { }

  @Get(':user_id')
  @ApiCookieAuth()
  @ApiOperation({ summary: "get all a user's saved movies" })
  @UseGuards(AuthGuard)
  async getSavedMovies(@Param('user_id') user_id: string) {
    return this.savedMoviesService.getSavedMovies(user_id);
  }

  @Post()
  @ApiCookieAuth()
  @ApiOperation({ summary: 'add a new saved movie' })
  @UseGuards(AuthGuard)
  async create(@Body() createSavedMovieDto: CreateSavedMovieDto) {
    return this.savedMoviesService.create(createSavedMovieDto);
  }

  @Delete(':movie_id')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'delete a saved movie' })
  @UseGuards(AuthGuard)
  async removeMovie(
    @Req() req: Request & { user: { user_id: string } },
    @Param('movie_id') movie_id: string,
  ) {
    const user_id = req.user.user_id;
    return this.savedMoviesService.removeMovie(user_id, movie_id);
  }
}
