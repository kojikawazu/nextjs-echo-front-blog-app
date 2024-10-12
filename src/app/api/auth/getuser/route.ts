import { cookies } from 'next/headers';

/**
 * 認証ユーザー情報を取得する
 * @returns 認証ユーザー情報
 */
export async function GET() {
    console.log('fetch auth user GET start...');
    const fetchUrl = `${process.env.API_URL}/users/auth-check`;

    // クッキーを取得
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    console.log('isTokenCookie:', tokenCookie !== undefined);

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                Cookie: tokenCookie ? `token=${tokenCookie.value}` : '',
            },
        });
        console.log('fetch auth user GET response:', response);

        if (response.ok) {
            console.log('fetch auth user GET response.ok');
            const data = await response.json();
            console.log('fetch auth user GET data:', data);

            return new Response(JSON.stringify({ content: data }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        } else {
            console.error('fetch auth user GET response.error');
            return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
                status: 500,
            });
        }
    } catch (error) {
        console.error('fetch auth user GET error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
            status: 500,
        });
    }
}
