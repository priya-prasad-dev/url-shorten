import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cachedDb: Connection | null = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const db = await mongoose.connect(MONGODB_URI, options);

  cachedDb = db.connection;

  return db.connection;
};
