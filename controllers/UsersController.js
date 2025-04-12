import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const users = dbClient.db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Already exist' });

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    const result = await users.insertOne({ email, password: hashedPassword });

    return res.status(201).json({ id: result.insertedId, email });
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne(
      { _id: dbClient.ObjectId(userId) },
      { projection: { email: 1 } }
    );

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    res.status(200).send({ id: userId, email: user.email });
  }
}

export default UsersController;
