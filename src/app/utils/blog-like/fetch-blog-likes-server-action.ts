'use server';

// cookies
import { cookies } from 'next/headers';
// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * ブログいいねを作成する
 * @param blogId ブログID
 * @returns true | false
 * @throws Error
 */
export const createBlogLikeByIdServerAction = async (blogId: string) => {
    console.log('createBlogLikeByIdServerAction: ');
    const funcName = '[createBlogLikeByIdServerAction]';
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.BLOG_LIKE_CREATE}/${blogId}`;

    // クッキーの取得
    const cookieStore = cookies();
    const visitIdToken = cookieStore.get(CommonConstants.TOKEN_NAME.VISIT_ID_TOKEN);
    //console.log('create blog like by id POST token: ', visitIdToken);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(visitIdToken ? { Cookie: `${CommonConstants.TOKEN_NAME.VISIT_ID_TOKEN}=${visitIdToken.value}` } : {}),
            },
        });

        console.log(funcName, ' create blog like by id POST response status: ', response.status);

        if (response.ok) {
            return true;
        } else {
            console.error(
                funcName,
                ' Failed to create blog like by id response status: ',
                response.status,
            );
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to create blog like by id. ' + error);
    }
};

/**
 * ブログいいねを削除する
 * @param blogId ブログID
 * @returns true | false
 * @throws Error
 */
export const deleteBlogLikeByIdServerAction = async (blogId: string) => {
    console.log('deleteBlogLikeByIdServerAction: ');
    const funcName = '[deleteBlogLikeByIdServerAction]';
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.BLOG_LIKE_DELETE}/${blogId}`;

    // クッキーの取得
    const cookieStore = cookies();
    const visitIdToken = cookieStore.get(CommonConstants.TOKEN_NAME.VISIT_ID_TOKEN);
    //console.log('create blog like by id POST token: ', visitIdToken);

    try {
        const response = await fetch(`${fetchUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(visitIdToken ? { Cookie: `${CommonConstants.TOKEN_NAME.VISIT_ID_TOKEN}=${visitIdToken.value}` } : {}),
            },
        });

        console.log(funcName, ' delete blog like by id DELETE response status: ', response.status);

        if (response.ok) {
            return true;
        } else {
            console.error(
                funcName,
                ' Failed to delete blog like by id response status: ',
                response.status,
            );
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to delete blog like by id. ' + error);
    }
};
