export const isAdmin = (telegramId) => {
  return telegramId === process.env.ADMIN_ID;  // (মামুন) তোমার অ্যাডমিন টেলিগ্রাম আইডি `.env` ফাইলে সংরক্ষণ করবে।
};