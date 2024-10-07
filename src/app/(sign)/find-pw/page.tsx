'use client';

//hooks
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
// actions
import { findPwAction } from '@/actions/findPwAction';

export default function FindPwPage() {
  const [state, formAction] = useFormState(findPwAction, { message: null });
  const [pw, setPw] = useState('');

  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    if (state?.ok) {
      setPw(state?.data);
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    } else if (state?.validationError) {
      setErrorMessage(state?.validationError);
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-24">
      <h2 className="text-xl font-bold italic mb-8">Find Password</h2>
      {pw ? (
        <div className="flex items-center justify-center border p-2 rounded-md">
          <p className="mr-4">Your Password is</p>
          <p className="outline-none font-bold text-lg">「{pw}」</p>
        </div>
      ) : (
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
          <button className="w-full bg-black text-white py-2" type="submit">
            Find
          </button>
        </form>
      )}
    </div>
  );
}

function EssentialMark() {
  return <span className="text-red-500">*</span>;
}
