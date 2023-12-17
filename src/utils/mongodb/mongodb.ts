import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let mongoClient: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // TODO: Add a nice console log message here when this is used.
  
  if (!global._mongoClient) {
    client = new MongoClient(uri, options);
    global._mongoClient = client.connect();
  }
  mongoClient = global._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  mongoClient = client.connect();
}

export default mongoClient;
