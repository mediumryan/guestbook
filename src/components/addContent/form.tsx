'use client';
import { useEffect } from 'react';
import AddContentHeader from './header';
import { useFormState } from 'react-dom';
import AddContentInputZone from './inputzone';
import { submitContentAction } from '@/actions/submitContentAction';
import { useRouter } from 'next/navigation';

export default function AddContentForm({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const [state, formAction] = useFormState(submitContentAction, {
    message: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      alert(state?.message);
      router.push('/');
      router.refresh();
    }
  }, [state]);

  return (
    <form action={formAction}>
      <AddContentHeader />
      <AddContentInputZone userId={userId} userName={userName} />
    </form>
  );
}
