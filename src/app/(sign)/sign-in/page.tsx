'use client';

// hooks
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// types
import { UserType } from '@/type/types';
// actions
import { signInAction } from '@/actions/signInAction';

export default function SignInPage() {
  const [state, formAction] = useFormState(signInAction, { message: null });
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  async function getUser(user: UserType) {
    const res = await fetch('/api/getUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    if (res.ok) {
      alert(`Welcome, ${user.user_id}!`);
      router.push('/');
      router.refresh();
    }
  }

  useEffect(() => {
    if (state?.ok) {
      getUser(state?.user);
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    } else if (state?.validationError) {
      setErrorMessage(state?.validationError);
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-24">
      <h2 className="text-2xl font-bold italic mb-8">Sign In</h2>
      <form action={formAction} className="w-[320px] grid grid-rows-3 gap-2">
        <div className="grid grid-cols-6">
          <label className="col-span-1 text-left p-2">ID</label>

          <div className="col-span-5 flex flex-col">
            <input
              className="p-2 border rounded-sm"
              type="text"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              name="id"
            />
            {errorMessage?.id && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage?.id._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-1 text-left p-2">PW</label>
          <div className="col-span-5 flex flex-col">
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
            {errorMessage?.pw && (
              <p className="text-red-500 text-sm">
                {errorMessage?.pw._errors[0]}
              </p>
            )}
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-1 h-12 rounded-sm"
          type="submit"
        >
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
