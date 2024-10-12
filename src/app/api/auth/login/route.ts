/**
 * ログイン処理
 * POST /api/auth/login
 * @param req Request
 * @returns ログイン結果
 * @throws Error ログイン処理に失敗した場合
 */
export async function POST(req: Request) {
    console.log('POST start...');

    const fetchUrl = `${process.env.API_URL}/users/login`;
    const { email, password } = await req.json();

    try {
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('auth login post response status:', response.status);
        //console.log('auth login post response headers:', response.headers);
        //console.log('fetch auth user GET response body:', await response.text());

        if (response.ok) {
            console.log('auth login post response.ok');

            // クッキーをレスポンスヘッダーに含めて返す
            const cookie = response.headers.get('set-cookie');
            const responseHeaders = new Headers();
            if (cookie) {
                responseHeaders.append('Set-Cookie', cookie);
            }

            return new Response(JSON.stringify({ message: 'Auth user login OK' }), {
                headers: responseHeaders, // クッキーを含めたレスポンス
                status: 200,
            });
        } else {
            console.error('auth login post response.error: ', response.status);
            return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
                status: response.status,
            });
        }
    } catch (error) {
        console.error('ログイン処理に失敗しました:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
            status: 500,
        });
    }
}
