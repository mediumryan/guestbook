export async function POST(req: Request) {
  const { user } = await req.json();

  if (user) {
    const userData = {
      id: user.id,
      name: user.name,
      user_id: user.user_id,
    };

    return new Response('Cookie Setting', {
      status: 200,
      headers: {
        'Set-Cookie': [
          `user=${JSON.stringify(userData)}; Path=/; HttpOnly`,
        ].join(', '),
      },
    });
  } else {
    return new Response('Failed to set cookie', { status: 500 });
  }
}
