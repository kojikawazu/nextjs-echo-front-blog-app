/**
 * 認証ユーザー情報を取得する
 * GET /api/auth/getuser
 * @param req リクエスト
 * @returns 認証ユーザー情報
 * @throws エラー ユーザー情報の取得に失敗した場合
 */
export async function GET(req: Request) {
    console.log('fetch auth user GET start...');
    const fetchUrl = `${process.env.API_URL}/users/auth-check`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');
    //console.log('Incoming request cookie:', cookie);

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                // クッキーをバックエンドに転送
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
        });

        console.log('fetch auth user GET response status:', response.status);
        //console.log('fetch auth user GET response header:', response.headers);

        if (response.ok) {
            console.log('fetch auth user GET response.ok');
            const responseBody = await response.text();
            //console.log('fetch auth user GET response body:', responseBody);
            const data = JSON.parse(responseBody);
            //console.log('fetch auth user GET data:', data);

            const responseHeaders = new Headers();
            responseHeaders.append('Content-Type', 'application/json');

            return new Response(JSON.stringify({ content: data }), {
                headers: responseHeaders,
                status: 200,
            });
        } else {
            console.error('fetch auth user GET response.error: ', response.status);
            return new Response(JSON.stringify({ error: 'Failed to fetch auth user' }), {
                status: response.status,
            });
        }
    } catch (error) {
        console.error('fetch auth user GET error:', error);
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
        });
    }
}
