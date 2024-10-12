import React from 'react';
import BlogDetail from '@/app/components/blog/detail/BlogDetail';

/**
 * ブログ詳細ページ
 * @param blogId
 * @returns JSX
 */
const BlogDetailPage = ({ params }: { params: { blogId: string } }) => {
    return <BlogDetail blogId={params.blogId} />;
};

export default BlogDetailPage;
