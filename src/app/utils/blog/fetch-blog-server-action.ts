'use server';

// cookies
import { cookies } from 'next/headers';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { BlogCreateFormType, RawBlogType } from '@/app/types/blogs-types';

/**
 * ブログ作成関数(サーバーサイド)
 * @param formData
 * @returns 追加後のブログデータ or null
 * @throws Error
 */
export const createBlogServerAction = async (formData: FormData) => {
    console.log('createBlogServerAction: ');
    const fetchUrl = `${process.env.API_URL}/blogs/create`;

    // 渡すデータのセット
    const createFormData: BlogCreateFormType = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        githubUrl: formData.get('githubUrl') as string,
        category: formData.get('category') as string,
        tags: formData.get('tags') as string,
    };

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token.value}` } : {}),
            },
            body: JSON.stringify(createFormData),
        });

        console.log('create blog POST response status: ', response.status);
        //console.log(`create blog POST response.headers: ${response.headers}`);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData: RawBlogType[] = JSON.parse(responseBody);
            //console.log('create blog POST response body: ', blogData);
            return blogData;
        } else {
            console.log('create blog POST response error status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to create blog. ' + error);
    }
};

/**
 * ブログ更新関数(サーバーサイド)
 * @param formData フォームデータ
 * @param blogId ブログID
 * @returns 更新後のブログデータ or null
 * @throws Error
 */
export const updateBlogServerAction = async (formData: FormData, blogId: string) => {
    console.log('updateBlogServerAction: ');
    const fetchUrl = `${process.env.API_URL}/blogs/update/${blogId}`;

    // 渡すデータのセット
    const updateFormData: BlogCreateFormType = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        githubUrl: formData.get('githubUrl') as string,
        category: formData.get('category') as string,
        tags: formData.get('tags') as string,
    };

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token.value}` } : {}),
            },
            body: JSON.stringify(updateFormData),
        });

        console.log('update blog PUT response status: ', response.status);
        //console.log(`create blog POST response.headers: ${response.headers}`);

        if (response.ok) {
            const responseBody = await response.text();
            const blogData: RawBlogType[] = JSON.parse(responseBody);
            //console.log('update blog PUT response body: ', blogData);
            return blogData;
        } else {
            console.log('update blog PUT response error status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to update blog. ' + error);
    }
};

/**
 * ブログ削除関数(サーバーサイド)
 * @param blogId ブログID
 * @returns true or false
 * @throws Error
 */
export const deleteBlogServerAction = async (blogId: string) => {
    console.log('deleteBlogServerAction: ');
    const fetchUrl = `${process.env.API_URL}/blogs/delete/${blogId}`;

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token.value}` } : {}),
            },
        });

        console.log('delete blog DELETE response status: ', response.status);
        //console.log(`delete blog DELETE response.headers: ${response.headers}`);

        if (response.ok) {
            return true;
        } else {
            console.log('delete blog DELETE response error status: ', response.status);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to delete blog. ' + error);
    }
};
