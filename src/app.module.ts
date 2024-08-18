import { Module } from '@nestjs/common';
import { FavoriteMoviesModule } from './api/favorite-movies/favorite-movies.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { HandleCacheModule } from './utils/handle-cache/handle-cache.module';
import { SavedMoviesModule } from './api/saved-movies/saved-movies.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({ url: process.env.URI_DB_REDIS }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_DB),
    FavoriteMoviesModule,
    HandleCacheModule,
    SavedMoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
