import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class SavedMovie {
  @Prop()
  user_id: string;

  @Prop({ type: Number })
  movie_id: number;

  @Prop()
  title: string;

  @Prop()
  poster_path?: string;

  @Prop()
  release_date?: string;

  @Prop({ type: Number })
  vote_average?: number;
}

export const savedMovieSchema = SchemaFactory.createForClass(SavedMovie);
