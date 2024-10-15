import { toast } from 'react-toastify';
import { BlogCreateFormType, RawBlogType } from '@/app/types/blogs-types';

/**
 * ブログデータ取得関数
 * @param blogId ブログID
 * @returns ブログデータ or null
 * @throws Error
 */
export const fetchBlogById = async (blogId: string) => {
    try {
        const responseDetail = await fetch(`/api/blog/detail/${blogId}`);

        if (responseDetail.ok) {
            const responseData: RawBlogType = await responseDetail.json();
            return responseData;
        } else {
            console.error('Failed to fetch blog by id');
            return null;
        }
    } catch (error) {
        console.error('Server error:', error);
        throw new Error('Failed to fetch blog by id');
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
        const response = await fetch(`/api/blog/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('create blog POST response status:', response.status);
        //console.log(`response.headers: ${response.headers}`);

        if (response.ok) {
            toast.success('ブログを追加しました。');
            return true;
        } else {
            console.log('response.error');
            toast.error('ブログの追加に失敗しました。');
            return false;
        }
    } catch (error) {
        console.error('Server error:', error);
        toast.error('ブログの追加に失敗しました。');
        throw new Error('Failed to create blog');
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
        const response = await fetch(`/api/blog/update/${blogId}`, {
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
            toast.success('ブログを更新しました。');
            return true;
        } else {
            console.log('response.error');
            toast.error('ブログの更新に失敗しました。');
            return false;
        }
    } catch (error) {
        console.error('Server error:', error);
        toast.error('ブログの更新に失敗しました。');
        throw new Error('Failed to update blog');
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
        const response = await fetch(`/api/blog/delete/${blogId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log('delete blog by id DELETE response status:', response.status);

        if (response.ok) {
            toast.success('ブログを削除しました。');
            return true;
        } else {
            toast.error('ブログの削除に失敗しました');
            console.error('delete blog by id DELETE from response status:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Failed to delete blog:', error);
        toast.error('ブログの削除に失敗しました');
        throw new Error('Failed to delete blog');
    }
};
