import { cookies } from 'next/headers';
import Link from 'next/link';
import { BiHome } from 'react-icons/bi';
import Buttons from './buttons';

export default function Navbar() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || '';

  return (
    <nav className="flex justify-between items-center p-4 mt-8 bg-black text-white w-3/5 mx-auto rounded-md">
      <div className="flex items-center">
        <Link href="/">
          <BiHome className="w-8 h-8 mr-4 hover:text-slate-500 duration-300" />
        </Link>
        {userId && <h2 className="font-bold">Hello, {userId}!</h2>}
      </div>
      <Buttons userName={userId} />
    </nav>
  );
}
