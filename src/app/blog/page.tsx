import React, { Suspense } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
// utils
import { fetchAuthUserServerAction } from '@/app/utils/auth/fetch-auth-user-server-action';
// components
import LoadingTotal from '@/app/components/common/LoadingTotal';
import BlogMain from '@/app/components/blog/main/BlogMain';

type BlogMainProps = {
    searchParams: ReadonlyURLSearchParams;
};

/**
 * Blog main page.
 * @param props BlogMainProps
 * @returns JSX
 */
const BlogMainPage = async (props: BlogMainProps) => {
    let inAuthUser: UserAuthType | null = null;
    let selectCategory = '';

    try {
        // 認証ユーザーの取得
        inAuthUser = await fetchAuthUserServerAction();
        if (!inAuthUser) {
            console.error('Failed to fetch auth user.');
            return redirect(CommonConstants.URL_PATH.USER_LOGIN);
        }
        //console.log('BlogEditPage authUser: ', inAuthUser);

        // クエリーパラメータからカテゴリーを取得
        const { searchParams } = props;
        const queryParams = new URLSearchParams(searchParams);
        selectCategory = queryParams.get(CommonConstants.BLOG_LIST.QUERY_PARAM_CATEGORY) || '';
    } catch (error) {
        console.error('BlogMainPage error: ', error);
        return redirect(CommonConstants.URL_PATH.USER_LOGIN);
    }

    return (
        <Suspense fallback={<LoadingTotal />}>
            <BlogMain selectCategory={selectCategory} inAuthUser={inAuthUser} />
        </Suspense>
    );
};

export default BlogMainPage;
