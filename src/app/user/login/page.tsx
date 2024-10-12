import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import UserLoginForm from '@/app/components/user/login/UserLoginForm';

/**
 * ユーザーログインページ
 * @returns JSX
 */
const UserLoginPage = () => {
    const tokenCookie = getCookieToken();
    return <UserLoginForm token={tokenCookie} />;
};

export default UserLoginPage;
