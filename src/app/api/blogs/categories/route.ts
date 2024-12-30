// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * ブログカテゴリー一覧取得API
 * @returns 200 or 500
 */
export async function GET() {
    console.log('GET /api/blogs/categories');
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.BLOG_CATEGORIES}`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache', // キャッシュを無効化
                Pragma: 'no-cache', // 互換性のため追加
                'If-None-Match': '', // 条件付きリクエストヘッダーを無効化
                'If-Modified-Since': '', // 条件付きリクエストヘッダーを無効化
            },
        });

        console.log('fetch blog categories GET response status:', response.status);
        //console.log('fetch blog categories GET response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const blogCategoriesData = JSON.parse(responseBody);
            //console.log('fetch blog categories GET response data:', blogCategoriesData);
            return new Response(JSON.stringify(blogCategoriesData), {
                status: 200,
            });
        } else {
            console.error(
                'failed fetch blog categories GET from response status:',
                response.status,
            );
            return new Response(JSON.stringify({ error: 'Failed fetch blog categories' }), {
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
