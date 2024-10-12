import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import BlogDetail from '@/app/components/blog/detail/BlogDetail';

/**
 * ブログ詳細ページ
 * @param blogId
 * @returns JSX
 */
const BlogDetailPage = ({ params }: { params: { blogId: string } }) => {
    const tokenCookie = getCookieToken();
    return <BlogDetail token={tokenCookie} blogId={params.blogId} />;
};

export default BlogDetailPage;
