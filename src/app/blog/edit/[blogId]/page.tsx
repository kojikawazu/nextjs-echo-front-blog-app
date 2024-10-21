import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
// utils
import { fetchAuthUserServerAction } from '@/app/utils/auth/fetch-auth-user-server-action';
// components
import BlogEditForm from '@/app/components/blog/edit/BlogEditForm';
import LoadingTotal from '@/app/components/common/LoadingTotal';

/**
 * ブログ編集ページ
 * @param params ブログID
 * @returns JSX
 */
const BlogEditPage = async ({ params }: { params: { blogId: string } }) => {
    // 認証ユーザーの取得
    const inputAuthUser: UserAuthType | null = await fetchAuthUserServerAction();
    if (!inputAuthUser) {
        console.error('Failed to fetch auth user.');
        return redirect(CommonConstants.URL_PATH.USER_LOGIN);
    }
    //console.log('BlogEditPage authUser: ', inputAuthUser);

    return (
        <Suspense fallback={<LoadingTotal />}>
            <BlogEditForm editBlogId={params.blogId} inputAuthUser={inputAuthUser} />
        </Suspense>
    );
};

export default BlogEditPage;
