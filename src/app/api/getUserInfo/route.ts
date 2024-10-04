import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { userId, name } = await req.json();

  const cookieStore = cookies();
  cookieStore.set('userId', userId);
  cookieStore.set('userName', name);

  const id = cookieStore.get('userId');
  const userName = cookieStore.get('userName');

  if (id && userName) {
    return new Response('Cookie Setting', {
      status: 200,
      headers: {
        'Set-Cookie': [
          `userId=${id.value}; Path=/; HttpOnly`,
          `userName=${userName.value}; Path=/; HttpOnly`,
        ].join(', '),
      },
    });
  } else {
    return new Response('Failed to set cookie', { status: 500 });
  }
}
