import { Module } from '@nestjs/common';
import { HandleCacheService } from './handle-cache.service';

@Module({
  providers: [HandleCacheService],
  exports: [HandleCacheService],
})
export class HandleCacheModule {}
