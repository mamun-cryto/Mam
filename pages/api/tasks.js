import { readDB, writeDB } from '../../utils/db';

export default function handler(req, res) {
  const db = readDB();
  const { tasks } = db;

  if (req.method === 'POST') {
    const { task, coins } = req.body;

    tasks.push({ task, coins });
    writeDB(db);

    res.status(200).json({ message: 'Task created' });
  } else if (req.method === 'GET') {
    res.status(200).json({ tasks });
  }
}