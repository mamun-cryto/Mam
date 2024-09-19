import { readDB, writeDB } from '../../utils/db';

export default async function handler(req, res) {
  const { userId, coinsEarned } = req.body;

  try {
    const db = readDB();
    const { users } = db;

    const user = users.find(user => user.telegramId === userId);

    if (user) {
      user.coins += coinsEarned;
      writeDB(db);

      res.status(200).json({ totalCoins: user.coins });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update coins.' });
  }
}