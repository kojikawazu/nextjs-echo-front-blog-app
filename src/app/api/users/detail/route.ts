/**
 * ユーザー詳細情報取得API
 * @param req
 * @returns ユーザーデータ
 */
export async function GET(req: Request) {
    console.log('GET /api/users/:userId');
    const fetchUrl = `${process.env.API_URL}/users/detail`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');
    //console.log('Incoming request cookie:', cookie);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
        });

        console.log('fetch user by token GET response status:', response.status);
        //console.log('fetch user by token GET response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const userData = JSON.parse(responseBody);
            //console.log('fetch user by token GET response data:', userData);

            return new Response(JSON.stringify(userData), {
                status: 200,
            });
        } else {
            console.error('fetch user by token GET from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed user by token' }), {
                status: response.status,
            });
        }
    } catch (error) {
        console.error('Server error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
        });
    }
}
