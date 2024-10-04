'use server';

import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import moment from 'moment';

export async function submitContentAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const userName = formData.get('userName') as string;

  try {
    const connection = await dbConnect();

    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE user_id = ?',
      [userId]
    );
    const userList = Array.isArray(rows) ? (rows as ContentType[]) : [];
    const user = userList[0];
    await connection.execute(
      'INSERT INTO content (title, content, registered_date, registered_person, registered_person_name) VALUES (?, ?, ?, ?, ?)',
      [
        title,
        content,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        user.id,
        userName,
      ]
    );
    connection.end();

    return {
      ok: true,
      message: 'Submitted',
    };
  } catch (err: any) {
    console.error(err.message || 'error!');
  }
}
