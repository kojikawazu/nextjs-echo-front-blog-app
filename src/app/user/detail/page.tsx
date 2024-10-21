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
import UserDetail from '@/app/components/user/detail/UserDetail';

/**
 * ユーザー詳細ページ
 * @returns JSX
 */
const UserDetailPage = async () => {
    let inAuthUser: UserAuthType | null = null;

    try {
        // 認証ユーザーの取得
        inAuthUser = await fetchAuthUserServerAction();
        if (!inAuthUser) {
            console.error('Failed to fetch auth user.');
            return redirect(CommonConstants.URL_PATH.USER_LOGIN);
        }
        //console.log('BlogEditPage authUser: ', inAuthUser);
    } catch (error) {
        console.error('UserDetailPage error: ', error);
        return redirect(CommonConstants.URL_PATH.USER_LOGIN);
    }

    return (
        <Suspense fallback={<LoadingTotal />}>
            <UserDetail inAuthUser={inAuthUser} />
        </Suspense>
    );
};

export default UserDetailPage;
