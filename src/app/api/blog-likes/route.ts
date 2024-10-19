/**
 * ブログいいね一覧取得
 * @param req
 * @returns 200 | 500
 */
export async function GET(req: Request) {
    console.log('GET /api/blog-likes');
    const fetchUrl = `${process.env.API_URL}/blog-likes`;

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

        console.log('fetch blog likes GET response.status:', response.status);

        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
            });
        } else {
            console.error('fetch blog likes GET from response.status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed fetch blog likes GET' }), {
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
