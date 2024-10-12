import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import BlogEditForm from '@/app/components/blog/edit/BlogEditForm';

/**
 * ブログ編集ページ
 * @param params ブログID
 * @returns JSX
 */
const BlogEditPage = ({ params }: { params: { blogId: string } }) => {
    const tokenCookie = getCookieToken();
    return <BlogEditForm token={tokenCookie} editBlogId={params.blogId as string} />;
};

export default BlogEditPage;
