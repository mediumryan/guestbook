import { ContentType } from '@/type/types';
import React from 'react';
import Header from './contentHeader';
import ContentInputZone from './contentInputZone';

export default function Content({
  content,
  userId,
  userName,
}: {
  content: ContentType | undefined;
  userId: string;
  userName: string;
}) {
  return (
    <form>
      <Header
        registered_person_name={content?.registered_person_name}
        userName={userName}
        contentId={content?.id}
      />
      <ContentInputZone userId={userId} userName={userName} content={content} />
    </form>
  );
}
