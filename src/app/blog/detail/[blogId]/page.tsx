import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
// utils
import { fetchAuthUserServerAction } from '@/app/utils/auth/fetch-auth-user-server-action';
// components
import LoadingTotal from '@/app/components/common/LoadingTotal';
import BlogDetail from '@/app/components/blog/detail/BlogDetail';

/**
 * ブログ詳細ページ
 * @param blogId
 * @returns JSX
 */
const BlogDetailPage = async ({ params }: { params: { blogId: string } }) => {
    let inAuthUser: UserAuthType | null = null;

    try {
        // 認証ユーザーの取得
        inAuthUser = await fetchAuthUserServerAction();
        // if (!inAuthUser) {
        //     console.error('Failed to fetch auth user.');
        //     return redirect(CommonConstants.URL_PATH.USER_LOGIN);
        // }
        //console.log('BlogEditPage authUser: ', inputAuthUser);
    } catch (error) {
        console.error('BlogDetailPage error: ', error);
        return redirect(CommonConstants.URL_PATH.USER_LOGIN);
    }

    return (
        <Suspense fallback={<LoadingTotal />}>
            <BlogDetail blogId={params.blogId} inAuthUser={inAuthUser} />
        </Suspense>
    );
};

export default BlogDetailPage;
