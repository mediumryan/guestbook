'use server';

import { UserType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';

export async function signInAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const id = formData.get('id') as string;
  const pw = formData.get('pw') as string;

  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM user WHERE user_id = ?',
    [id]
  ); // id로 유저 검색
  connection.end();
  const userList = Array.isArray(rows) ? (rows as UserType[]) : [];

  try {
    if (userList.length === 0) {
      console.log('User not Found');
      return {
        ok: false,
        message: 'User not Found',
      };
    }

    const user = userList[0];

    // 입력한 비밀번호와 DB의 비밀번호를 직접 비교
    if (user.password === pw) {
      console.log('Login successful');
      return {
        ok: true,
        userId: user.user_id,
        userName: user.name,
      };
    } else {
      console.log('Invalid password');
      return {
        ok: false,
        message: 'Invalid Password',
      };
    }
  } catch (error) {
    console.error(error);
    // 에러 처리 로직
  }
  console.log(id, pw);
}
