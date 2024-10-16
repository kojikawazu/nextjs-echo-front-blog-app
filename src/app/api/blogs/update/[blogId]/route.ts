/**
 * ブログの更新処理API
 * @param req
 * @param blogId
 * @returns 200 or 500
 */
export async function PUT(
    req: Request,
    {
        params,
    }: {
        params: { blogId: string };
    },
) {
    console.log('DELETE /api/blogs/update/:blogId');
    const fetchUrl = `${process.env.API_URL}/blogs/update/${params.blogId}`;

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

        console.log('update blog by id PUT response status:', response.status);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData = JSON.parse(responseBody);
            //console.log('update blog by id PUT response data:', blogData);

            return new Response(JSON.stringify(blogData), {
                status: 200,
            });
        } else {
            console.error('update blog by id PUT from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed update blog by id' }), {
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
