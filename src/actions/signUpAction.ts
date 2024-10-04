'use server';

import { UserType } from '@/type/types';
import { dbConnect } from '@/utils/dbConnect';

export async function signUpAction(
  previousState: any,
  formData: FormData
): Promise<any> {
  previousState = null;

  const name = formData.get('name') as string;
  const id = formData.get('id') as string;
  const pw = formData.get('pw') as string;
  const pwCheck = formData.get('pwCheck') as string;

  const connection = await dbConnect();
  const [rows] = await connection.execute(
    'SELECT * FROM user WHERE user_id = ?',
    [id]
  ); // id로 유저 검색
  const userList = Array.isArray(rows) ? (rows as UserType[]) : [];

  try {
    const user = userList[0];

    // 아이디 중복 확인
    if (userList.length !== 0) {
      console.log('This ID is already been');
      return {
        ok: false,
        message: 'This ID is already been',
      };
    }

    // 비밀번호 체크
    if (pw !== pwCheck) {
      console.log('The values of PW and Check PW do not match.');
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
        userId: user.user_id,
        userName: user.name,
      };
    }
  } catch (error) {
    console.error(error);
    // 에러 처리 로직
  }
  console.log(id, pw);
}
