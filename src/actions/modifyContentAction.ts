'use server';

import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import moment from 'moment';

export async function modifyContentAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const btn = formData.get('btn');
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const userName = formData.get('userName') as string;
  const contentId = formData.get('contentId') as string;

  console.log(btn);

  try {
    const connection = await dbConnect();

    const [rows] = await connection.execute(
      'SELECT * FROM content WHERE id = ?',
      [contentId]
    );

    if (btn === 'modify') {
      const contentList = Array.isArray(rows) ? (rows as ContentType[]) : [];

      if (!contentList || contentList.length === 0) {
        connection.end();
        return {
          ok: false,
          message: 'Content not found',
        };
      }

      await connection.execute(
        'UPDATE content SET title = ?, content = ?, registered_date = ?, registered_person = ?, registered_person_name = ? WHERE id = ?',
        [
          title,
          content,
          moment().format('YYYY-MM-DD HH:mm:ss'),
          userId,
          userName,
          contentId,
        ]
      );
      connection.end();

      return {
        ok: true,
        message: 'Content updated successfully',
      };
    } else if (btn === 'delete') {
      await connection.execute('DELETE FROM content WHERE id = ?', [contentId]);
      connection.end();

      return {
        ok: true,
        message: 'Content deleted successfully',
      };
    }
  } catch (err: any) {
    console.error(err.message || 'error!');
    return {
      ok: false,
      message: 'Error updating content',
    };
  }
}
