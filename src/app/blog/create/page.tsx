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
import BlogCreateForm from '@/app/components/blog/create/BlogCreateForm';

/**
 * ブログ作成フォームページ
 * @returns JSX
 */
const BlogCreateFormPage = async () => {
    let inAuthUser: UserAuthType | null = null;

    try {
        // 認証ユーザーの取得
        inAuthUser = await fetchAuthUserServerAction();
        if (!inAuthUser) {
            console.error('Failed to fetch auth user.');
            return redirect(CommonConstants.URL_PATH.USER_LOGIN);
        }
        //console.log('BlogEditPage authUser: ', inputAuthUser);
    } catch (error) {
        console.error('BlogCreateFormPage error: ', error);
        return redirect(CommonConstants.URL_PATH.USER_LOGIN);
    }

    return (
        <Suspense fallback={<LoadingTotal />}>
            <BlogCreateForm inAuthUser={inAuthUser} />;
        </Suspense>
    );
};

export default BlogCreateFormPage;
