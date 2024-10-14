/**
 * Create blog API
 * POST /api/blog/create
 * @param req Request
 * @returns Response
 */
export async function POST(req: Request) {
    console.log('POST /api/blog/create');

    const fetchUrl = `${process.env.API_URL}/blogs/create`;
    // フォームのデータを取得
    const reqBody = await req.json();

    // リクエストヘッダーとの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', reqBody);

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');
    //console.log('Incoming request cookie:', cookie);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
            body: JSON.stringify(reqBody),
        });

        console.log('fetch blogs GET response status:', response.status);
        //console.log('create blog POST response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData = JSON.parse(responseBody);
            //console.log('create blog POSTresponse data:', blogData);

            return new Response(JSON.stringify(blogData), {
                status: 200,
            });
        } else {
            console.error('failed create blog POST from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed create blog' }), {
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
