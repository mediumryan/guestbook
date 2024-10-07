'use server';

import { ContentType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import moment from 'moment';
import { z, ZodError } from 'zod';

const submitContentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export async function submitContentAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;

  const dataForValidate = {
    title: title,
    content: content,
  };

  try {
    submitContentSchema.parse(dataForValidate);

    const connection = await dbConnect();

    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE user_id = ?',
      [userId]
    );
    const userList = Array.isArray(rows) ? (rows as ContentType[]) : [];
    const user = userList[0];
    await connection.execute(
      'INSERT INTO content (title, content, registered_date, registered_person) VALUES (?, ?, ?, ?)',
      [title, content, moment().format('YYYY-MM-DD HH:mm:ss'), userId]
    );
    connection.end();

    return {
      ok: true,
      message: 'Submitted',
    };
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
