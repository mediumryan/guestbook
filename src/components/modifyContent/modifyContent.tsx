'use client';

import { ContentType } from '@/type/types';
import ModifyContentHeader from './header';
import ModifyContentInputZone from './inputZone';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { modifyContentAction } from '@/actions/modifyContentAction';
import { useEffect } from 'react';

export default function ModifyContent({
  id,
  content,
  userId,
  userName,
}: {
  id: string;
  content: ContentType | undefined;
  userId: string;
  userName: string;
}) {
  const [state, formAction] = useFormState(modifyContentAction, {
    message: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      alert(state?.message);
      router.push('/');
      router.refresh();
    } else if (!state?.ok && state?.message) {
      alert(state?.message);
    }
  }, [state]);

  return (
    <form id="modify-form" action={formAction}>
      <ModifyContentHeader
        registered_person_name={content?.registered_person_name}
        userName={userName}
      />
      <ModifyContentInputZone
        contentId={id}
        userId={userId}
        userName={userName}
        content={content}
      />
    </form>
  );
}
