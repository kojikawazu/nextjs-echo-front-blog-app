import { useState } from 'react';
import { BlogCreateFormType } from '@/app/types/blogs-types';

/**
 * ブログ作成フォームカスタムフック
 * @returns カスタムhooks
 */
export const useBlogCreateForm = () => {
    // フォームデータ
    const [formData, setFormData] = useState<BlogCreateFormType>({
        title: '',
        description: '',
        githubUrl: '',
        category: '',
        tags: '',
    });

    return {
        formData,
        setFormData,
    };
};
