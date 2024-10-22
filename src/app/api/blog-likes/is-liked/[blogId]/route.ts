import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * いいねしているかどうかを取得する
 * @param req
 * @param blogId
 * @returns 200 | 500
 */
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { blogId: string };
    },
) {
    console.log('GET /api/blog-likes/is-liked/:blogId');
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.IS_LIKED}/${params.blogId}`;

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

        console.log('is liked GET response status:', response.status);

        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
            });
        } else {
            console.error('is liked GET from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed get is liked' }), {
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
