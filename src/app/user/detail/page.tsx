import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import UserDetail from '@/app/components/user/detail/UserDetail';

/**
 * ユーザー詳細ページ
 * @returns JSX
 */
const UserDetailPage = () => {
    const tokenCookie = getCookieToken();
    return <UserDetail token={tokenCookie} />;
};

export default UserDetailPage;
