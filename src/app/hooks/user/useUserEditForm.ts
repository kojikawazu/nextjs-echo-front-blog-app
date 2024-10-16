import { useState } from 'react';
import { UserEditFormType } from '@/app/types/users-type';

/**
 * ユーザー情報編集フォームカスタムフック
 * @returns カスタムフック
 */
export const useUserEditForm = () => {
    // ユーザーデータ取得中
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    // フォームデータ
    const [formData, setFormData] = useState<UserEditFormType>({
        name: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });

    return {
        isLoadingUserData,
        formData,
        setIsLoadingUserData,
        setFormData,
    };
};
