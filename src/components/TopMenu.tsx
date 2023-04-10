import { ConnectWallet } from '@thirdweb-dev/react';
import Link from 'next/link';

const TopMenu = () => {
    return (
        <div className='flex items-center bg-gray-600'>
            <div className='flex font-mono font-bold'>
                <Link href="/" className='rounded-lg mx-3 my-3 px-4 py-2 border-2 border-blue-100 text-blue-200 hover:bg-blue-300 hover:text-black duration-300'>
                    Home
                </Link>
                <Link href="/game" className='rounded-lg mr-3 my-3 px-4 py-2 border-2 border-blue-100 text-blue-200 hover:bg-blue-300 hover:text-black duration-300'>
                    Game
                </Link>
                <Link href="/locations" className='rounded-lg my-3 px-4 py-2 border-2 border-blue-100 text-blue-200 hover:bg-blue-300 hover:text-black duration-300'>
                    Locations
                </Link>
            </div>
            <div className='m-4 ml-auto font-mono'>
                <ConnectWallet />
            </div>
        </div>
    );
}

export default TopMenu;