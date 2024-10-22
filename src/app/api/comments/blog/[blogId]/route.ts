// constants
import { CommonConstants } from "@/app/utils/constants/common-constants";

/**
 * ブログIDに紐づくコメントリストを取得する
 * @param blogId
 * @returns コメントリスト
 */
export async function GET(req: Request, { params }: { params: { blogId: string } }) {
    console.log('GET /api/comments/blog/:blogId');
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.COMMENT_BLOG}/${params.blogId}`;

    // リクエストヘッダーとボディの確認
    //console.log('Incoming request headers:', req.headers);
    //console.log('Incoming request body:', await req.text());

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        console.log('fetch comments by blogId GET response status:', response.status);
        //console.log('fetch comments by blogId GET response headers:', response.headers);

        if (response.ok) {
            const responseBody = await response.text();
            const commentsData = JSON.parse(responseBody);
            //console.log('fetch comments by blogId GET response data:', commentsData);

            return new Response(JSON.stringify(commentsData), {
                status: 200,
            });
        } else {
            console.error('fetch comments by blogId GET from response status:', response.status);
            return new Response(JSON.stringify({ error: 'Failed fetch comments by blogId' }), {
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
