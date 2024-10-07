import AddContentForm from '@/components/addContent/form';
import { UserType } from '@/type/types';
import { cookies } from 'next/headers';

export default function AddContentPage() {
  const cookieStore = cookies();
  const user = cookieStore.get('user')
    ? (JSON.parse(cookieStore.get('user')?.value as string) as UserType)
    : undefined;
  return (
    <div className="flex flex-col md:w-3/4 mx-auto mt-12">
      <AddContentForm user={user} />
    </div>
  );
}
