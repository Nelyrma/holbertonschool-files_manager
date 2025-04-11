import dbClient from '../utils/db'
import crypto from 'crypto'

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
}

module.exports = UsersController;
