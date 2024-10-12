import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import BlogCreateForm from '@/app/components/blog/create/BlogCreateForm';

/**
 * ブログ作成フォームページ
 * @returns JSX
 */
const BlogCreateFormPage = () => {
    const tokenCookie = getCookieToken();
    return <BlogCreateForm token={tokenCookie} />;
};

export default BlogCreateFormPage;
