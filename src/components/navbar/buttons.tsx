'use client';

import { UserType } from '@/type/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Buttons({ user }: { user: UserType | undefined }) {
  const router = useRouter();

  async function signOut() {
    const res = await fetch('/api/signOut', { method: 'POST' });
    if (res.ok) {
      alert('Log out');
      router.push('/sign-in');
      router.refresh();
    }
  }

  return (
    <ul className="flex">
      {user ? (
        <li>
          <button
            className="bg-slate-700 py-1 px-2 mx-1 rounded-md hover:opacity-75"
            onClick={signOut}
          >
            Sign out
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link href="/sign-up">
              <button className="bg-slate-700 py-1 px-2 mx-1 rounded-md hover:opacity-75">
                Sign up
              </button>
            </Link>
          </li>
          <li>
            <Link href="/sign-in">
              <button className="bg-slate-700 py-1 px-2 mx-1 rounded-md hover:opacity-75">
                Sign in
              </button>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
