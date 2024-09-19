import { readDB, writeDB } from '../../utils/db';

export default async function handler(req, res) {
  const { authData } = req.body;

  try {
    const db = readDB();
    const { users } = db;

    const userExists = users.find(user => user.telegramId === authData.id);

    if (!userExists) {
      const newUser = {
        telegramId: authData.id,
        username: authData.username,
        photoUrl: authData.photo_url,  // টেলিগ্রাম ইউজারের প্রোফাইল ছবি
        coins: 0
      };

      db.users.push(newUser);
      writeDB(db);
    }

    res.status(200).json({ message: 'User authenticated and saved.' });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed.' });
  }
}