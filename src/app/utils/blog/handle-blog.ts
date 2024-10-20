import { BlogType } from '@/app/types/blogs-types';
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

/**
 * ブログのページネーション
 * @param blogs ブログリスト
 * @param page ページ番号
 * @param itemsPerPage　1ページあたりのアイテム数
 * @returns ページネーションされたブログリスト
 */
export const paginateBlogs = (blogs: BlogType[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return blogs.slice(startIndex, startIndex + itemsPerPage);
};
