import React from 'react';
import UserEditForm from '@/app/components/user/edit/UserEditForm';

/**
 * ユーザー編集フォームページ
 * @param userId
 * @returns JSX
 */
const UserEditFormPage = ({ params }: { params: { userId: string } }) => {
    return <UserEditForm userId={params.userId} />;
};

export default UserEditFormPage;
