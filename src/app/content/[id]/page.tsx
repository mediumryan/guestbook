import Content from '@/components/content/content';
import { ContentType, UserType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import { cookies } from 'next/headers';

async function getContent() {
  const connection = await dbConnect();
  const [rows] = await connection.execute(`
    SELECT content.*, user.user_id
    FROM content
    LEFT JOIN user ON content.registered_person = user.id
  `);
  connection.end();
  const contentList = Array.isArray(rows) ? rows : [];
  return contentList;
}

export default async function ContentPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const user = cookieStore.get('user')
    ? (JSON.parse(cookieStore.get('user')?.value as string) as UserType)
    : undefined;

  const contents = (await getContent()) as ContentType[];
  const content = contents.find((a) => a.id === Number(params.id));

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-12">
      <Content content={content} user={user} />
    </div>
  );
}
