import { toast } from 'react-toastify';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { BlogCreateFormType, RawBlogType } from '@/app/types/blogs-types';

/**
 * 全ブログデータ取得関数
 * @returns ブログリスト
 */
export const fetchBlogs = async () => {
    try {
        const response = await fetch(`/api/blogs`, {
            method: 'GET',
            credentials: 'include',
        });

        console.log('fetch blogs GET response status: ', response.status);
        //console.log('fetch blogs GET response headers:', response.headers);

        if (response.ok) {
            const responseData: RawBlogType[] = await response.json();
            //console.log('fetch blogs GET response data:', responseData);
            return responseData;
        } else {
            console.error('Failed to fetch blogs: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch blogs data. ' + error);
    }
};

/**
 * ブログデータ取得関数
 * @param blogId ブログID
 * @returns ブログデータ or null
 * @throws Error
 */
export const fetchBlogById = async (blogId: string) => {
    try {
        const responseDetail = await fetch(`/api/blogs/detail/${blogId}`, {
            method: 'GET',
        });

        console.log('fetch blog by id GET response status: ', responseDetail.status);
        //console.log('fetch blogs GET response headers:', response.headers);

        if (responseDetail.ok) {
            const responseData: RawBlogType = await responseDetail.json();
            return responseData;
        } else {
            console.error('Failed to fetch blog by id: ', responseDetail.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch blog by id. ' + error);
    }
};

/**
 * ブログ作成関数
 * @param formData フォームデータ
 * @returns true or false
 * @throws Error
 */
export const createBlog = async (formData: BlogCreateFormType) => {
    try {
        // API 送信
        const response = await fetch(`/api/blogs/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('create blog POST response status: ', response.status);
        //console.log(`response.headers: ${response.headers}`);

        if (response.ok) {
            toast.success(CommonConstants.TOAST_MESSAGE.ADD_BLOG_SUCCESSED);
            return true;
        } else {
            console.log('create blog POST response error status: ', response.status);
            toast.error(CommonConstants.TOAST_MESSAGE.ADD_BLOG_FAILURE);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        toast.error(CommonConstants.TOAST_MESSAGE.ADD_BLOG_FAILURE);
        throw new Error('Failed to create blog. ' + error);
    }
};

/**
 * ブログ更新関数
 * @param blogId ブログID
 * @param formData フォームデータ
 * @returns true or false
 * @throws Error
 */
export const updateBlog = async (blogId: string, formData: BlogCreateFormType) => {
    try {
        // API 送信
        const response = await fetch(`/api/blogs/update/${blogId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('update blog by id PUT response status:', response.status);
        //console.log(`response.headers: ${response.headers}`);

        if (response.ok) {
            toast.success(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_SUCCESSED);
            return true;
        } else {
            console.log('update blog by id PUT response error status:', response.status);
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_FAILURE);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_FAILURE);
        throw new Error('Failed to update blog. ' + error);
    }
};

/**
 * ブログの削除関数
 * @param blogId ブログID
 * @returns true or false
 * @throws Error
 */
export const deleteBlog = async (blogId: string) => {
    try {
        const response = await fetch(`/api/blogs/delete/${blogId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log('delete blog by id DELETE response status:', response.status);

        if (response.ok) {
            toast.success(CommonConstants.TOAST_MESSAGE.DELETE_BLOG_SUCCESSED);
            return true;
        } else {
            toast.error(CommonConstants.TOAST_MESSAGE.DELETE_BLOG_FAILURE);
            console.error('delete blog by id DELETE from response status: ', response.status);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        toast.error(CommonConstants.TOAST_MESSAGE.DELETE_BLOG_FAILURE);
        throw new Error('Failed to delete blog. ' + error);
    }
};
