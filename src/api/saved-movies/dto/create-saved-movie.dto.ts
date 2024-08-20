import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSavedMovieDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  movie_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  poster_path: string;

  @ApiProperty()
  @IsString()
  @IsOptional() overview?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  release_date: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  vote_average: number;
}
