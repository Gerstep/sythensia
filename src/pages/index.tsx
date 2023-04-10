import HeroBanner from '../components/HeroBanner'
import DefaultLayout from '@/components/DefaultLayout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <DefaultLayout>
        <HeroBanner />

        <Link href="/game">
          <button className='m-5 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Launch game</button>
        </Link>
        <Link href="/locations">
          <button className='m-5 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Game Evolution</button>
        </Link>
    </DefaultLayout>
  );
}