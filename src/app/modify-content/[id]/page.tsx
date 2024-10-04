import ModifyContent from '@/components/modifyContent/modifyContent';
import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import { cookies } from 'next/headers';
import React from 'react';

async function getContent() {
  const connection = await dbConnect();
  const [rows] = await connection.execute('SELECT * FROM content');
  connection.end();
  const contentList = Array.isArray(rows) ? rows : [];
  return contentList;
}

export default async function ModifyContentPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || '';
  const userName = cookieStore.get('userName')?.value || '';

  const contents = (await getContent()) as ContentType[];
  const content = contents.find((a) => a.id === Number(params.id));

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-12">
      <ModifyContent content={content} userId={userId} userName={userName} />
      {/* <AddContentForm userId={userId} userName={userName} /> */}
    </div>
  );
}
