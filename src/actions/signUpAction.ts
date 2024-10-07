'use server';

import { UserType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';
import { z, ZodError } from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    id: z.string().min(1, { message: 'ID is required' }),
    pw: z.string().min(1, { message: 'PW is required' }),
    pwCheck: z.string().min(1, { message: 'Check PW is required' }),
  })
  .refine(
    (data) => {
      if (data.pw !== data.pwCheck) {
        return false;
      }
      return true;
    },
    { message: 'PW and Check PW are not the same.', path: ['pwCheck'] }
  );

export async function signUpAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const name = formData.get('name') as string;
  const id = formData.get('id') as string;
  const pw = formData.get('pw') as string;
  const pwCheck = formData.get('pwCheck') as string;

  const dataForValidate = {
    name: name,
    id: id,
    pw: pw,
    pwCheck: pwCheck,
  };

  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM user WHERE user_id = ?',
    [id]
  ); // id로 유저 검색
  const userList = Array.isArray(rows) ? (rows as UserType[]) : [];

  try {
    signUpSchema.parse(dataForValidate);

    const user = userList[0];

    // 아이디 중복 확인
    if (userList.length !== 0) {
      return {
        ok: false,
        message: 'This ID is already been',
      };
    }

    // 비밀번호 체크
    if (pw !== pwCheck) {
      return {
        ok: false,
        message: 'The values of PW and Check PW do not match.',
      };
    }

    if (userList.length === 0 && pw === pwCheck) {
      await connection.execute(
        'INSERT INTO user (name,user_id,password) VALUES (?,?,?)',
        [name, id, pw]
      );
      const [rows] = await connection.execute(
        'SELECT * FROM user WHERE user_id = ?',
        [id]
      ); // id로 유저 검색
      const userList = Array.isArray(rows) ? (rows as UserType[]) : [];
      const user = userList[0];
      connection.end();
      return {
        ok: true,
        user: user,
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
