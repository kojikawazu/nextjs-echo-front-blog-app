// constants
import { CommonConstants } from "@/app/utils/constants/common-constants";

/**
 * ブログデータを取得する
 * GET /api/blogs/detail/:blogId
 * @param req
 * @param blogId
 * @returns ブログデータ
 */
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { blogId: string };
    },
) {
    console.log('GET /api/blogs/detail/:blogId');
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.BLOG_DETAIL}/${params.blogId}`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

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

        console.log('fetch blog by id GET response status:', response.status);
        //console.log('fetch blog by id GET response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData = JSON.parse(responseBody);
            //console.log('fetch blog by id GET response data:', blogData);
            return new Response(JSON.stringify(blogData), {
                status: 200,
            });
        } else {
            console.error('fetch blog by id GET from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed fetch blog by id' }), {
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
