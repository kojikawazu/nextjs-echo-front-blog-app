/**
 * ログイン処理
 */
export async function POST(req: Request) {
    console.log('POST start...');

    const { email, password } = await req.json();
    const fetchUrl = `${process.env.API_URL}/users/login`;

    try {
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        console.log('auth login post response status:', response.status);
        console.log('auth login post response headers:', response.headers);
        console.log('auth login post response body:', response.body);

        if (response.ok) {
            console.log('auth login post response.ok');

            // クッキーをレスポンスヘッダーに含めて返す
            const cookie = response.headers.get('set-cookie');
            const responseHeaders = new Headers();
            responseHeaders.append('Set-Cookie', cookie!);

            return new Response(JSON.stringify({ message: 'Auth user login OK' }), {
                headers: responseHeaders, // クッキーを含めたレスポンス
                status: 200,
            });
        } else {
            console.error('auth login post response.error');
            return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
                status: 500,
            });
        }
    } catch (error) {
        console.error('ログイン処理に失敗しました:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch content from GitHub' }), {
            status: 500,
        });
    }
}
