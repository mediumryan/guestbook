'use server';

import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import moment from 'moment';
import { z, ZodError } from 'zod';

const modifyContentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export async function modifyContentAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const btn = formData.get('btn');
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const contentId = formData.get('contentId') as string;

  const dataForValidate = {
    title: title,
    content: content,
  };

  const connection = await dbConnect();

  if (btn === 'delete') {
    await connection.execute('DELETE FROM content WHERE id = ?', [contentId]);
    connection.end();

    return {
      ok: true,
      message: 'Content deleted successfully',
    };
  }

  try {
    modifyContentSchema.parse(dataForValidate);

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
        'UPDATE content SET title = ?, content = ?, registered_date = ?, registered_person = ? WHERE id = ?',
        [
          title,
          content,
          moment().format('YYYY-MM-DD HH:mm:ss'),
          userId,
          contentId,
        ]
      );
      connection.end();

      return {
        ok: true,
        message: 'Content updated successfully',
      };
    }
  } catch (err: any) {
    if (err instanceof ZodError) {
      return {
        data: null,
        error: null,
        validationError: err.format(),
      };
    } else {
      // Other errors
      console.error('server error:', err);
      return {
        status: 'error',
        message: err.message,
      };
    }
  }
}
