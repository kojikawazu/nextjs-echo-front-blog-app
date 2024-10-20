import React from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';

// constants
import { CommonConstants } from '../utils/constants/common-constants';
// components
import BlogMain from '@/app/components/blog/main/BlogMain';

type BlogMainProps = {
    searchParams: ReadonlyURLSearchParams;
};

/**
 * Blog main page.
 * @param props BlogMainProps
 * @returns JSX
 */
const BlogMainPage = (props: BlogMainProps) => {
    const { searchParams } = props;
    const queryParams = new URLSearchParams(searchParams);
    const selectCategory = queryParams.get(CommonConstants.BLOG_LIST.QUERY_PARAM_CATEGORY) || '';

    return <BlogMain selectCategory={selectCategory} />;
};

export default BlogMainPage;
