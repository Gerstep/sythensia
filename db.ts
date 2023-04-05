import { MongoClient, MongoClientOptions } from 'mongodb';

const clientOptions: MongoClientOptions = {
  connectTimeoutMS: 5000
};

const uri = process.env.MONGODB_URI as string;

export async function connectToDatabase() {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
    throw error;
  }
}


