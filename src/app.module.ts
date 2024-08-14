import { Module } from '@nestjs/common';
import { FavoriteMoviesModule } from './api/favorite-movies/favorite-movies.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FavoriteMoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_DB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
