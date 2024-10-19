/**
 * いいねを削除する
 * @param req
 * @param blogId
 * @returns 200 | 500
 */
export async function DELETE(
    req: Request,
    {
        params,
    }: {
        params: { blogId: string };
    },
) {
    console.log('DELETE /api/blog-likes/delete/:blogId');
    const fetchUrl = `${process.env.API_URL}/blog-likes/delete/${params.blogId}`;

    // クライアントから受け取ったクッキーを取得
    const cookie = req.headers.get('cookie');
    //console.log('Incoming request cookie:', cookie);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(cookie ? { Cookie: cookie } : {}),
            },
        });

        console.log('delete blog like DELETE response status:', response.status);

        if (response.ok) {
            return new Response(JSON.stringify({ error: 'Delete successed' }), {
                status: 200,
            });
        } else {
            console.error('delete blog like DELETE from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed delete blog like' }), {
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
