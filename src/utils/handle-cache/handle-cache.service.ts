import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class HandleCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * @description This method is used to retrieve a value from the cache using a given key.
   * @param key The key used to store the value in the cache.
   * @returns The value stored in the cache for the given key. If no value is found, it returns undefined.
   */
  async getCache(key: string) {
    const value = await this.cacheManager.get(key);
    if (value) {
      return value;
    }
  }

  /**
   * @description This method is used to store a value in the cache with a given key.
   * @param key The key used to store the value in the cache.
   * @param value The value to be stored in the cache.
   * @returns Nothing. Once the value is stored in the cache, the method completes.
   */
  async setCache(key: string, value: object) {
    await this.cacheManager.set(key, value, 60000);
  }

  /**
   * @description This method is used to remove all values from the cache.
   * @returns Nothing. Once all values are removed from the cache, the method completes.
   */
  async resetCache() {
    return await this.cacheManager.reset();
  }
}
