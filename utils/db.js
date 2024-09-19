import fs from 'fs';
import path from 'path';

// db.json ফাইলের পাথ খুঁজে বের করা
const dbPath = path.join(process.cwd(), 'db.json');

// ফাইল থেকে ডেটা পড়ার ফাংশন
export const readDB = () => {
  const jsonData = fs.readFileSync(dbPath);
  return JSON.parse(jsonData);
};

// ফাইলে ডেটা লেখার ফাংশন
export const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};