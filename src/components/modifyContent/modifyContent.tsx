'use client';

import { ContentType, UserType } from '@/type/types';
import ModifyContentHeader from './header';
import ModifyContentInputZone from './inputZone';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { modifyContentAction } from '@/actions/modifyContentAction';
import { useEffect, useState } from 'react';

export default function ModifyContent({
  id,
  content,
  user,
}: {
  id: string;
  content: ContentType | undefined;
  user: UserType | undefined;
}) {
  const [state, formAction] = useFormState(modifyContentAction, {
    message: null,
  });
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    if (state?.ok) {
      alert(state?.message);
      router.push('/');
      router.refresh();
    } else if (state?.validationError) {
      setErrorMessage(state?.validationError);
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    }
  }, [state]);

  return (
    <form id="modify-form" action={formAction}>
      <ModifyContentHeader content={content} user={user} />
      <ModifyContentInputZone
        content={content}
        user={user}
        errorMessage={errorMessage}
      />
    </form>
  );
}
