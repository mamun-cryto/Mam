import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // (মামুন) এখানে টেলিগ্রাম অথেন্টিকেশন API ব্যবহার করে ইউজারের ডেটা সংগ্রহ করবে।
    fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ authData: {/* তোমার টেলিগ্রাম ইউজারের তথ্য */} })
    })
    .then(response => response.json())
    .then(data => setUserData(data));
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {userData.username}</h1>
      <img src={userData.photoUrl} alt="Profile" />
      <p>Coins: {userData.coins}</p>
      <Footer />
    </div>
  );
};

export default Home;