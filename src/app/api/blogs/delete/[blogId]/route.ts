/**
 * ブログ削除API
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
    console.log('DELETE /api/blogs/delete/:blogId');
    const fetchUrl = `${process.env.API_URL}/blogs/delete/${params.blogId}`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

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

        console.log('delete blog by id DELETE response status:', response.status);

        if (response.ok) {
            return new Response(JSON.stringify({ error: 'Delete successed' }), {
                status: 200,
            });
        } else {
            console.error('delete blog by id DELETE from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed delete blog by id' }), {
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
