import AddContentForm from '@/components/addContent/form';
import { cookies } from 'next/headers';
import React from 'react';

export default function AddContentPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || '';
  const userName = cookieStore.get('userName')?.value || '';

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-12">
      <AddContentForm userId={userId} userName={userName} />
    </div>
  );
}
