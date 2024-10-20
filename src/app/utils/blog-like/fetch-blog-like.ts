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

/**
 * いいねを作成する
 * @param blogId
 * @returns true or false
 */
export const createBlogLikeById = async (blogId: string) => {
    try {
        const response = await fetch(`/api/blog-likes/create/${blogId}`, {
            method: 'POST',
            credentials: 'include',
        });

        console.log('create blog like by id POST response status:', response.status);

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to create blog like by id response status:', response.status);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to create blog like by id. ' + error);
    }
};

/**
 * いいねを削除する
 * @param blogId
 * @returns true or false
 * @throws Error
 */
export const deleteBlogLikeById = async (blogId: string) => {
    try {
        const response = await fetch(`/api/blog-likes/delete/${blogId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log('delete blog like by id DELETE response status:', response.status);

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to delete blog like by id response status:', response.status);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to delete blog like by id. ' + error);
    }
};
