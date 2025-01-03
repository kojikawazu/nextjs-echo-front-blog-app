// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * 全ブログ情報の取得
 * GET /api/blogs
 * @param req リクエスト
 * @returns ブログ情報リスト or エラーメッセージ
 */
export async function GET(req: Request) {
    console.log('GET /api/blogs');
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.BLOGS}`;

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

        console.log('fetch blogs GET response status:', response.status);
        //console.log('fetch blogs GET response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData = JSON.parse(responseBody);
            //console.log('fetch blogs GET response data:', blogData);
            return new Response(JSON.stringify(blogData), {
                status: 200,
            });
        } else {
            console.error('failed fetch blogs GET from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed fetch blogs' }), {
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
