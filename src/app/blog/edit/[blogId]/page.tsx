import React from 'react';
import BlogEditForm from '@/app/components/blog/edit/BlogEditForm';

/**
 * ブログ編集ページ
 * @param params ブログID
 * @returns JSX
 */
const BlogEditPage = ({ params }: { params: { blogId: string } }) => {
    return <BlogEditForm editBlogId={params.blogId as string} />;
};

export default BlogEditPage;
