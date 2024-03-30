// imported 'Cache' is factory to receive storage that implements ICacheStorage
// in this example, we'll initialize in-memory cache
import { Cache, ICacheStorage } from 'nestjs-omacache';

// for example, we can use redis for storage
// What ever your implementation is, it must satisfies ICacheStorage interface.
// class RedisStorage implements ICacheStorage {
//     get(key: string) {...}
//     set(key: string, val: any) {...}
//     has(key: string) {...}
//     delete(key: string) {...}
// }

// Then you can make External Redis Cache!
// const ExternalCache = Cache({ storage: new RedisStorage() })

// ...or
// Map implements all the signatures of ICacheStorage
// so you can just pass Map instance
export const InMemoryCache = Cache({ storage: new Map() satisfies ICacheStorage });
