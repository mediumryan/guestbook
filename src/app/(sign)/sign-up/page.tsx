'use client';

import { signUpAction } from '@/actions/signUpAction';
import { UserType } from '@/type/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUpAction, { message: null });
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<any>(null);

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
      <h2 className="text-xl font-bold italic mb-8">Sign Up</h2>
      <form action={formAction} className="w-[400px] grid grid-rows-3 gap-2">
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">
            Name
            <EssentialMark />
          </label>
          <div className="flex flex-col col-span-4">
            <input
              className="col-span-4 p-2 border rounded-sm"
              type="text"
              placeholder="Please, Enter your Name"
              name="name"
            />
            {errorMessage?.name && (
              <p className="text-red-500 text-sm">
                {errorMessage?.name._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">
            ID
            <EssentialMark />
          </label>
          <div className="flex flex-col col-span-4">
            <input
              className="col-span-4 p-2 border rounded-sm"
              type="text"
              placeholder="Please, Enter your ID"
              name="id"
            />
            {errorMessage?.id && (
              <p className="text-red-500 text-sm">
                {errorMessage?.id._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">
            PW
            <EssentialMark />
          </label>
          <div className="flex flex-col col-span-4">
            <input
              className="col-span-4 p-2 border rounded-sm"
              type="password"
              placeholder="Please, Enter your Password"
              name="pw"
            />
            {errorMessage?.pw && (
              <p className="text-red-500 text-sm">
                {errorMessage?.pw._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-2 text-left p-2">
            Check PW
            <EssentialMark />
          </label>
          <div className="flex flex-col col-span-4">
            <input
              className="col-span-4 p-2 border rounded-sm"
              type="password"
              placeholder="Please, Enter your Password"
              name="pwCheck"
            />
            {errorMessage?.pwCheck && (
              <p className="text-red-500 text-sm">
                {errorMessage?.pwCheck._errors[0]}
              </p>
            )}
          </div>
        </div>
        <button className="w-full bg-black text-white py-2" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

function EssentialMark() {
  return <span className="text-red-500">*</span>;
}
