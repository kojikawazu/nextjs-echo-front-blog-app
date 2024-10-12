/**
 * ログアウトAPI
 * GET /api/auth/logout
 */
export async function GET(req: Request) {
    console.log('logout GET start...');
    const fetchUrl = `${process.env.API_URL}/users/logout`;

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');

    try {
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                // クッキーをバックエンドに転送
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
        });

        console.log('logout GET response status:', response.status);

        if (response.ok) {
            console.log('logout GET response.ok');

            const responseHeaders = new Headers();
            responseHeaders.append('Content-Type', 'application/json');
            const cookie = response.headers.get('set-cookie');
            if (cookie) {
                responseHeaders.append('Set-Cookie', cookie);
            }

            return new Response(JSON.stringify({ message: 'Auth user logout OK' }), {
                headers: responseHeaders,
                status: 200,
            });
        } else {
            console.error('logout GET response.error: ', response.status);
            return new Response(JSON.stringify({ error: 'Failed to logout from GitHub' }), {
                status: response.status,
            });
        }
    } catch (error) {
        console.error('logout GET error:', error);
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
        });
    }
}
