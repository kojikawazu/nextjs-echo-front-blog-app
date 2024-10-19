/**
 * いいねを作成する
 * @param req
 * @param blogId
 * @returns 200 | 500
 */
export async function POST(
    req: Request,
    {
        params,
    }: {
        params: { blogId: string };
    },
) {
    console.log('POST /api/blog-likes/create/:blogId');
    const fetchUrl = `${process.env.API_URL}/blog-likes/create/${params.blogId}`;

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
        });

        console.log('create blog like POST response status:', response.status);

        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
            });
        } else {
            console.error('create blog like POST from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed create blog like' }), {
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
