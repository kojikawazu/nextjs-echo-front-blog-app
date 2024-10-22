// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * 訪問IDを生成する
 * @returns void
 */
export const generateVisitId = async () => {
    try {
        const response = await fetch(`/api/blog-likes/generate-visit-id`, {
            method: 'GET',
        });

        console.log('Generate visitId response status:', response.status);
        //console.log('Generate visitId response headers:', response.headers);
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to generate visitId. ' + error);
    }
};

/**
 * ブログいいね一覧取得
 * @returns responseData or null
 */
export const fetchBlogLikes = async () => {
    try {
        const response = await fetch(`/api/blog-likes`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        console.log('fetch blog likes GET response status:', response.status);

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error('Failed to fetch blog likes response status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch blog likes. ' + error);
    }
};

/**
 * いいねを取得する
 * @param blogId
 * @returns responseData or null
 * @throws Error
 */
export const fetchBlogLikeById = async (blogId: string) => {
    try {
        const response = await fetch(`/api/blog-likes/is-liked/${blogId}`, {
            method: 'GET',
            credentials: 'include',
        });

        console.log('fetch blog like by id GET response status:', response.status);

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error('Failed to fetch blog like by id response status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch blog like by id. ' + error);
    }
};
