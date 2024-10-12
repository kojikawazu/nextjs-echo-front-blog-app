import { cookies } from 'next/headers';

export async function GET() {
    console.log('API Route - getuser called');

    const fetchUrl = `${process.env.API_URL}/users/auth-check`;
    console.log('fetchUrl:', fetchUrl);

    // クッキーを取得
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    console.log('isTokenCookie:', tokenCookie !== undefined);
    console.log('tokenCookie:', tokenCookie);

    return Response.json({ message: 'Hello from getuser' }, { status: 200 });
}
