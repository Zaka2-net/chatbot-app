// global.d.ts
import { MongoClient } from 'mongodb';

declare global {
  var _mongoClient: Promise<MongoClient> | undefined;
  var _mongooseClient: typeof mongoose | undefined;
}
