import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class FavoriteMovie {
  @Prop()
  user_id: string;

  @Prop({ type: Number })
  movie_id: number;

  @Prop()
  title: string;

  @Prop()
  poster_path?: string;

  @Prop()
  overview?: string

  @Prop()
  release_date?: string;

  @Prop({ type: Number })
  vote_average?: number;
}

export const favoriteMovieSchema = SchemaFactory.createForClass(FavoriteMovie);
