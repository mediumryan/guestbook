import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('user');
  const response = NextResponse.json({ message: 'Cookies deleted' });
  revalidatePath('/login');
  return response;
}
