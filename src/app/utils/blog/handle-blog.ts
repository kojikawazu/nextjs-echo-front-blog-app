import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
