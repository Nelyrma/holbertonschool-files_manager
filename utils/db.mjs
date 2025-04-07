import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
      const port = process.env.DB_PORT || 27017;
      const database = process.env.DB_DATABASE || 'files_manager';

      const uri = `mongodb://${host}:${port}/${database}`;
      this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      this.client.connect().catch(err => {
        console.error('MongoDB connection error:', err);
      });
    }
    
  async isAlive() {
    try {
      await this.client.db().command({ ping: 1 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    const db = this.client.db();
    return await db.collection('users').countDocuments();
  }

  async nbFiles() {
    const db = this.client.db();
    return await db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
