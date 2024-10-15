import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { BlogCreateFormType } from '@/app/types/blogs-types';

/**
 * フォームの変更を処理する
 * @param e
 * @param formData
 * @param setFormData
 */
export const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formData: BlogCreateFormType,
    setFormData: (value: React.SetStateAction<BlogCreateFormType>) => void,
) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

/**
 * ブログ作成フォームを表示する
 * @param router
 */
export const handleCreateBlogForm = (router: AppRouterInstance) => {
    router.push('/blog/create');
};

/**
 * ブログ編集フォームを表示する
 * @param router
 * @param blogId
 */
export const handleEditBlogForm = (router: AppRouterInstance, blogId: string) => {
    router.push(`/blog/edit/${blogId}`);
};
