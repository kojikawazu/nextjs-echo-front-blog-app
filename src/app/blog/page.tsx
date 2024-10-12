import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import BlogMain from '@/app/components/blog/main/BlogMain';

/**
 * Blog main page.
 * @returns JSX
 */
const BlogMainPage = () => {
    const tokenCookie = getCookieToken();
    return <BlogMain token={tokenCookie} />;
};

export default BlogMainPage;
