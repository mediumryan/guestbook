'use server';

import { dbConnect } from '@/utils/dbConnect';
import { z, ZodError } from 'zod';

const signInSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  pw: z.string().min(1, { message: 'PW is required' }),
});

type UserType = {
  id: number;
  name: string;
  user_id: string;
  password: string;
};

export async function signInAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const id = formData.get('id') as string;
  const pw = formData.get('pw') as string;

  const dataForValidate = {
    id: id,
    pw: pw,
  };

  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM user WHERE user_id = ?',
    [id]
  ); // id로 유저 검색
  connection.end();
  const userList = Array.isArray(rows) ? (rows as UserType[]) : [];

  try {
    signInSchema.parse(dataForValidate);

    if (userList.length === 0) {
      return {
        ok: false,
        message: 'User not Found',
      };
    }

    const user = userList[0];

    // 입력한 비밀번호와 DB의 비밀번호를 직접 비교
    if (user.password === pw) {
      return {
        ok: true,
        user: user,
      };
    } else {
      return {
        ok: false,
        message: 'Invalid Password',
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
