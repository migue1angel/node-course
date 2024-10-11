import mongoose, { mongo } from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      return true;
    } catch (error) {
      console.log("Mongo connection error");

      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
