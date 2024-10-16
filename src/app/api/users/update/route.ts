/**
 * ユーザー情報更新API
 * @param req
 * @returns ユーザーデータ
 */
export async function PUT(req: Request) {
    console.log('DELETE /api/users/update');
    const fetchUrl = `${process.env.API_URL}/users/update`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');
    //console.log('Incoming request cookie:', cookie);

    // フォームのデータを取得
    const reqBody = await req.json();

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
            body: JSON.stringify(reqBody),
        });

        console.log('update user by token PUT response status:', response.status);

        if (response.ok) {
            const responseBody = await response.text();
            const userData = JSON.parse(responseBody);
            //console.log('update user by token PUT response data:', userData);

            // クッキーをレスポンスヘッダーに含めて返す
            const updatedCookie = response.headers.get('set-cookie');
            const responseHeaders = new Headers();
            if (updatedCookie) {
                responseHeaders.append('Set-Cookie', updatedCookie);
            }

            return new Response(JSON.stringify(userData), {
                headers: responseHeaders, // クッキーを含めたレスポンス
                status: 200,
            });
        } else {
            console.error('update user by token PUT from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed update user by token' }), {
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
