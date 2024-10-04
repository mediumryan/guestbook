import { ContentType } from '@/type/types';
import moment from 'moment';
import React from 'react';

export default function ContentItem({ data }: { data: ContentType }) {
  return (
    <div className="grid grid-cols-12 bg-white text-black p-4 m-2 rounded-md items-start">
      {/* content left */}
      <div className="col-span-2 flex flex-col items-center">
        <div className="bg-slate-800 rounded-full w-[75px] h-[75px] flex justify-center items-center">
          <p className="text-white font-bold text-2xl opacity-40">
            {data.registered_person_name.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <span className="text-sm mt-2">{data.registered_person_name}</span>
      </div>
      {/* content right */}
      <div className="col-span-10 flex flex-col">
        {/* title and date */}
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg">{data.title}</h4>
          <span className="text-xs">
            {moment(data.registered_date).format('YYYY-MM-DD')}
          </span>
        </div>
        {/* content paragraph */}
        <div className="truncate">{data.content}</div>
      </div>
    </div>
  );
}
