'use client';

import { signInAction } from '@/actions/signInAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function SignInPage() {
  const [state, formAction] = useFormState(signInAction, { message: null });
  const router = useRouter();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  async function getUserName(userId: string, name: string) {
    const res = await fetch('/api/getUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, name: name }),
    });
    if (res.ok) {
      alert('Sign In');
      router.push('/');
      router.refresh();
    }
  }

  useEffect(() => {
    if (state?.ok) {
      getUserName(state?.userId, state?.userName);
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-24">
      <h2 className="text-2xl font-bold italic mb-8">Sign In</h2>
      <form action={formAction} className="w-[320px] grid grid-rows-3 gap-2">
        <div className="grid grid-cols-6">
          <label className="col-span-1 text-left p-2">ID</label>
          <input
            className="col-span-5 p-2 border rounded-sm"
            type="text"
            placeholder="Enter your ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            name="id"
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-1 text-left p-2">PW</label>
          <input
            className="col-span-5 p-2 border rounded-sm"
            type="password"
            placeholder="Enter your Password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            name="pw"
          />
        </div>
        <button className="w-full bg-black text-white py-2" type="submit">
          Login
        </button>
        <div className="flex justify-between items-center">
          <Link
            href="/sign-up"
            className="border-b py-1 px-2 hover:opacity-50 hover:scale-105"
          >
            Create new Account
          </Link>
          <Link
            href="/find-pw"
            className="border-b py-1 px-2 hover:opacity-50 hover:scale-105"
          >
            Forgot your PW?
          </Link>
        </div>
      </form>
    </div>
  );
}
