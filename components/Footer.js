import Link from 'next/link';

const Footer = () => (
  <footer style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f1f1f1' }}>
    <Link href="/">Home</Link>
    <Link href="/tasks">Tasks</Link>
    <Link href="/ranking">Ranking</Link>
  </footer>
);

export default Footer;