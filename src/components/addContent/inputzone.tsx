'use client';

import { UserType } from '@/type/types';

export default function AddContentInputZone({
  user,
  errorMessage,
}: {
  user: UserType | undefined;
  errorMessage: any;
}) {
  return (
    <div>
      <div className="flex items-center">
        <label className="text-lg mr-12">Title</label>
        {errorMessage?.title && (
          <p className="text-red-500 text-sm">
            {errorMessage?.title._errors[0]}
          </p>
        )}
      </div>
      <input
        type="text"
        className="bg-slate-100 w-full mb-4 p-4"
        placeholder="Enter any title"
        name="title"
      />
      <div className="flex items-center">
        <label className="text-lg mr-12">Content</label>
        {errorMessage?.content && (
          <p className="text-red-500 text-sm">
            {errorMessage?.content._errors[0]}
          </p>
        )}
      </div>
      <textarea
        className="w-full min-h-[25vh] bg-slate-100 rounded-md p-4"
        placeholder="Enter any content"
        name="content"
      />
      <input type="hidden" value={user?.id} name="userId" />
    </div>
  );
}
