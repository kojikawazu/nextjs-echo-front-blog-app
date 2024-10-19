/**
 * 訪問IDを生成する
 * @returns 200 | 500
 * @throws Error
 */
export async function GET() {
    console.log('fetch generate visit id GET start...');
    const fetchUrl = `${process.env.API_URL}/blog-likes/generate-visit-id`;

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('fetch generate visit id GET response status:', response.status);

        if (response.ok) {
            console.log('fetch generate visit id GET response.ok');

            // クッキーをレスポンスヘッダーに含めて返す
            const cookie = response.headers.get('set-cookie');
            const responseHeaders = new Headers();
            if (cookie) {
                responseHeaders.append('Set-Cookie', cookie);
            }

            return new Response(JSON.stringify({ message: 'Generate visitId is OK.' }), {
                headers: responseHeaders, // クッキーを含めたレスポンス
                status: 200,
            });
        } else {
            console.error('fetch generate visit id GET response.error: ', response.status);
            return new Response(JSON.stringify({ error: 'Failed generate visitId' }), {
                status: response.status,
            });
        }
    } catch (error) {
        console.error('fetch generate visit id GET error:', error);
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
        });
    }
}
