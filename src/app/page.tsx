import ContentItem from '@/components/main/contentItem';
import MainHeader from '@/components/main/header';
import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import Link from 'next/link';

async function getContent() {
  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM content ORDER BY registered_date DESC'
  );
  connection.end();
  const contentList = Array.isArray(rows) ? rows : [];
  return contentList;
}

export default async function Home() {
  const contents = (await getContent()) as ContentType[];

  return (
    <div className="w-3/5 mx-auto">
      {/* main page header */}
      <MainHeader />
      {/* content list */}
      <div className="flex flex-col max-h-[67.5vh] overflow-auto bg-slate-100 rounded-md p-4">
        {contents.map((content: ContentType) => {
          return (
            <Link key={content.id} href={`/content/${content.id}`}>
              <ContentItem data={content} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
