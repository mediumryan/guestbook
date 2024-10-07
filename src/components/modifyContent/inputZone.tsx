'use client';

import { ContentType, UserType } from '@/type/types';
import { useEffect, useState } from 'react';

export default function ModifyContentInputZone({
  content,
  user,
  errorMessage,
}: {
  content: ContentType | undefined;
  user: UserType | undefined;
  errorMessage: any;
}) {
  const [title, setTitle] = useState(content?.title);
  const [contentData, setContentData] = useState(content?.content);

  useEffect(() => {
    document.getElementById('modify-title')?.focus();
  }, []);

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
        id="modify-title"
        className="bg-slate-100 w-full mb-4 p-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        value={contentData}
        onChange={(e) => setContentData(e.target.value)}
        name="content"
      />
      <input type="hidden" value={user?.id} name="userId" />
      <input type="hidden" value={content?.id} name="contentId" />
    </div>
  );
}
