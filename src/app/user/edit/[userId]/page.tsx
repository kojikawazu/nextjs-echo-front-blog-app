import React from 'react';
import { getCookieToken } from '@/app/utils/auth-user';
import UserEditForm from '@/app/components/user/edit/UserEditForm';

/**
 * ユーザー編集フォームページ
 * @param userId
 * @returns JSX
 */
const UserEditFormPage = ({ params }: { params: { userId: string } }) => {
    const tokenCookie = getCookieToken();
    return <UserEditForm token={tokenCookie} userId={params.userId} />;
};

export default UserEditFormPage;
