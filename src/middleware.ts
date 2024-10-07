import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const user = req.cookies.get('user')?.value;

  if (!user) {
    const redirectLink = `${
      process.env.NODE_ENV === 'production'
        ? process.env.SERVICE_URL_1
        : process.env.SERVICE_URL_2
    }/sign-in`;
    return NextResponse.redirect(redirectLink);
  }
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|find-pw).*)',
  ],
};
