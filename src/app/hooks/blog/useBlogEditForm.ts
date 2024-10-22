import { useState } from 'react';
// types
import { BlogCreateFormType } from '@/app/types/blogs-types';

/**
 * ブログ編集フォームカスタムフック
 * @returns カスタムhooks
 */
export const useBlogEditForm = () => {
    // ブログデータ取得中
    const [isLoadingBlogData, setIsLoadingBlogData] = useState(true);
    // フォームデータ
    const [formData, setFormData] = useState<BlogCreateFormType>({
        title: '',
        description: '',
        githubUrl: '',
        category: '',
        tags: '',
    });

    return {
        isLoadingBlogData,
        formData,
        setIsLoadingBlogData,
        setFormData,
    };
};
