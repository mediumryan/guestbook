import { ContentType, UserType } from '@/type/types';
import React from 'react';
import Header from './contentHeader';
import ContentInputZone from './contentInputZone';

export default function Content({
  content,
  user,
}: {
  content: ContentType | undefined;
  user: UserType | undefined;
}) {
  return (
    <form>
      <Header user={user} content={content} />
      <ContentInputZone user={user} content={content} />
    </form>
  );
}
