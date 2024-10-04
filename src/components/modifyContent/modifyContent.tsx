import { ContentType } from '@/type/types';
import ModifyContentHeader from './header';
import ModifyContentInputZone from './inputZone';

export default function ModifyContent({
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
      <ModifyContentHeader
        registered_person_name={content?.registered_person_name}
        userName={userName}
      />
      <ModifyContentInputZone
        userId={userId}
        userName={userName}
        content={content}
      />
    </form>
  );
}
