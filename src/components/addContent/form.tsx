'use client';
// hooks
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
// components
import AddContentHeader from './header';
import AddContentInputZone from './inputzone';
// actions
import { submitContentAction } from '@/actions/submitContentAction';
// types
import { UserType } from '@/type/types';

export default function AddContentForm({
  user,
}: {
  user: UserType | undefined;
}) {
  const [state, formAction] = useFormState(submitContentAction, {
    message: null,
  });

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    if (state?.ok) {
      setErrorMessage(null);
      alert(state?.message);
      router.push('/');
      router.refresh();
    } else if (state?.validationError) {
      setErrorMessage(state?.validationError);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <AddContentHeader />
      <AddContentInputZone user={user} errorMessage={errorMessage} />
    </form>
  );
}
