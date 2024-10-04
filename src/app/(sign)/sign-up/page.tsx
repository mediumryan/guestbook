'use client';

import { signUpAction } from '@/actions/signUpAction';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUpAction, { message: null });
  const router = useRouter();

  async function getUserName(userId: string, name: string) {
    const res = await fetch('/api/getUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, name: name }),
    });
    if (res.ok) {
      alert('Sign Up');
      router.push('/');
      router.refresh();
    }
  }

  useEffect(() => {
    if (state?.ok) {
      getUserName(state?.userId, state?.userName);
      console.log(state);
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-24">
      <h2 className="text-xl font-bold italic mb-8">Sign Up</h2>
      <form action={formAction} className="w-[400px] grid grid-rows-3 gap-2">
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">Name</label>
          <input
            className="col-span-4 p-2 border rounded-sm"
            type="text"
            placeholder="Please, Enter your Name"
            name="name"
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">ID</label>
          <input
            className="col-span-4 p-2 border rounded-sm"
            type="text"
            placeholder="Please, Enter your ID"
            name="id"
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">PW</label>
          <input
            className="col-span-4 p-2 border rounded-sm"
            type="password"
            placeholder="Please, Enter your Password"
            name="pw"
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">Check PW</label>
          <input
            className="col-span-4 p-2 border rounded-sm"
            type="password"
            placeholder="Please, Enter your Password"
            name="pwCheck"
          />
          <p></p>
        </div>
        <button className="w-full bg-black text-white py-2" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
