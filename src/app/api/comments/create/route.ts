/**
 * コメントデータの追加API
 * @param req
 * @returns コメントデータ
 */
export async function POST(req: Request) {
    console.log('POST /api/comments/create');

    const fetchUrl = `${process.env.API_URL}/comments/create`;
    // フォームのデータを取得
    const reqBody = await req.json();

    // リクエストヘッダーとの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', reqBody);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });

        console.log('create comment POST response status:', response.status);
        //console.log('create comment POST response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const commentData = JSON.parse(responseBody);
            //console.log('create comment POST response data:', blogData);

            return new Response(JSON.stringify(commentData), {
                status: 200,
            });
        } else {
            console.error('failed create comment POST from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed create comment' }), {
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
