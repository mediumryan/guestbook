'use server';

import { dbConnect } from '@/utils/dbConnect';
import { z, ZodError } from 'zod';

type UserType = {
  id: number;
  name: string;
  user_id: string;
  password: string;
};

const findPwSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  id: z.string().min(1, { message: 'ID is required' }),
});

export async function findPwAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const name = formData.get('name') as string;
  const id = formData.get('id') as string;

  const dataForValidate = {
    name: name,
    id: id,
  };

  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM user WHERE user_id = ? AND name = ?',
    [id, name]
  );
  const userList = Array.isArray(rows) ? (rows as UserType[]) : [];

  try {
    findPwSchema.parse(dataForValidate);

    const user = userList[0];

    if (!user) {
      return {
        ok: false,
        message: 'Unregistered user.',
      };
    } else {
      const [rows] = await connection.execute(
        'SELECT * FROM user WHERE user_id = ? AND name = ?',
        [id, name]
      );
      const userList = Array.isArray(rows) ? (rows as UserType[]) : [];
      const user = userList[0];
      return {
        ok: true,
        data: user.password,
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
