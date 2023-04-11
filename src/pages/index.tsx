import HeroBanner from '../components/HeroBanner'
import DefaultLayout from '@/components/DefaultLayout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <DefaultLayout>
        <div className='m-10 w-2/3'>
          <HeroBanner />
          <Link href="/game">
            <button className='m-5 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Explore the Story</button>
          </Link>
          <Link href="/locations">
            <button className='m-5 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Manage the World</button>
          </Link>
        </div>
    </DefaultLayout>
  );
}