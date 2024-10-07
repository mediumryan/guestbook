import { ContentType, UserType } from '@/type/types';
import Link from 'next/link';

export default function Header({
  user,
  content,
}: {
  user: UserType | undefined;
  content: ContentType | undefined;
}) {
  return (
    <div
      className={`flex items-center my-12 ${
        content?.registered_person === user?.id
          ? 'justify-between'
          : 'justify-start'
      }`}
    >
      <div className="col-span-2 flex flex-col items-center">
        <div className="bg-slate-800 rounded-full w-[50px] h-[50px] md:w-[75px] md:h-[75px] flex justify-center items-center">
          <p className="text-white font-bold text-2xl opacity-40">
            {content?.user_id?.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <span className="text-sm mt-2">{content?.user_id}</span>
      </div>
      {content?.registered_person === user?.id && (
        <Link href={`/modify-content/${content?.id}`}>
          <button
            type="submit"
            className="bg-slate-700 text-white px-2 md:px-4 py-1 md:py-2 mx-1 rounded-md hover:opacity-75"
          >
            MODIFY
          </button>
        </Link>
      )}
    </div>
  );
}
