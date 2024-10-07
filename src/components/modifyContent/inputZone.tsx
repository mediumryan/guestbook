'use client';

import { ContentType } from '@/type/types';
import { useEffect, useState } from 'react';

export default function ModifyContentInputZone({
  contentId,
  userId,
  userName,
  content,
}: {
  contentId: string;
  userId: string;
  userName: string;
  content: ContentType | undefined;
}) {
  const [title, setTitle] = useState(content?.title);
  const [contentData, setContentData] = useState(content?.content);

  useEffect(() => {
    document.getElementById('modify-title')?.focus();
  }, []);

  return (
    <>
      <label className="text-lg">Title</label>
      <input
        type="text"
        id="modify-title"
        className="bg-slate-100 w-full mb-4 p-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
      />
      <label className="text-lg">Content</label>
      <textarea
        className="w-full min-h-[25vh] bg-slate-100 rounded-md p-4"
        value={contentData}
        onChange={(e) => setContentData(e.target.value)}
        name="content"
      />
      <input type="hidden" value={userId} name="userId" />
      <input type="hidden" value={userName} name="userName" />
      <input type="hidden" value={contentId} name="contentId" />
    </>
  );
}
