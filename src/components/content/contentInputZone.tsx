'use client';

import { ContentType } from '@/type/types';
import moment from 'moment';

export default function ContentInputZone({
  content,
}: {
  userId: string;
  userName: string;
  content: ContentType | undefined;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-lg">Title</label>
      <input
        type="text"
        className="bg-slate-100 w-full mb-4 p-4 outline-none"
        value={content?.title}
        readOnly
      />
      <label className="text-lg">Content</label>
      <textarea
        className="w-full min-h-[25vh] bg-slate-100 rounded-md p-4 outline-none"
        value={content?.content}
        readOnly
      />
      <div className="flex justify-end">
        <span>{moment(content?.registered_date).format('YYYY-MM-DD')}</span>
      </div>
    </div>
  );
}
