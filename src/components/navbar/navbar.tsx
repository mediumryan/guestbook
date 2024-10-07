// hooks
import { cookies } from 'next/headers';
import Link from 'next/link';
// icons
import { BiHome } from 'react-icons/bi';
// components
import Buttons from './buttons';
// types
import { UserType } from '@/type/types';

export default function Navbar() {
  const cookieStore = cookies();
  const user = cookieStore.get('user')
    ? (JSON.parse(cookieStore.get('user')?.value as string) as UserType)
    : undefined;

  return (
    <nav className="flex justify-between items-center p-4 mt-8 bg-black text-white md:w-3/5 mx-auto rounded-md">
      <div className="flex items-center">
        <Link href="/">
          <BiHome className="w-8 h-8 mr-4 hover:text-slate-500 duration-300" />
        </Link>
        {user && <h2 className="font-bold">Hello, {user?.user_id}!</h2>}
      </div>
      <Buttons user={user} />
    </nav>
  );
}
