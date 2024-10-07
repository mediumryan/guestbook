import { ContentType, UserType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import moment from 'moment';

async function getUserId(id: number) {
  const connection = await dbConnect();
  const [rows] = await connection.execute(
    `SELECT user_id FROM user where id = ${id}`
  );
  connection.end();
  const userId = Array.isArray(rows) ? rows : [];
  return userId;
}

export default async function ContentItem({ data }: { data: ContentType }) {
  const userId = (await getUserId(data.registered_person)) as UserType[];

  const isToday = moment(data.registered_date).isSame(moment(), 'day');

  return (
    <div className="grid grid-cols-12 bg-white text-black p-4 m-2 rounded-md items-start">
      {/* content left */}
      <div className="col-span-2 flex flex-col items-center">
        <div className="bg-slate-800 rounded-full w-[75px] h-[75px] flex justify-center items-center">
          <p className="text-white font-bold text-2xl opacity-40">
            {userId[0].user_id.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <span className="text-sm mt-2">{userId[0].user_id}</span>
      </div>
      {/* content right */}
      <div className="col-span-10 flex flex-col">
        {/* title and date */}
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg">{data.title}</h4>
          <span className={`text-xs ${isToday && 'text-sky-500 font-bold'}`}>
            {moment(data.registered_date).format('YYYY-MM-DD')}
          </span>
        </div>
        {/* content paragraph */}
        <div className="truncate">{data.content}</div>
      </div>
    </div>
  );
}
