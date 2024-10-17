import { useState } from 'react';
import { UserLoginFormType } from '@/app/types/users-type';

/**
 * ユーザーログインフォームカスタムフック
 * @returns カスタムフック
 */
export const useUserLoginForm = () => {
    // エラーメッセージ
    const [errorMessage, setErrorMessage] = useState('');
    // ローディング
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    // フォームデータ
    const [formData, setFormData] = useState<UserLoginFormType>({
        username: '',
        password: '',
    });

    return {
        errorMessage,
        isLoginLoading,
        formData,
        setErrorMessage,
        setIsLoginLoading,
        setFormData,
    };
};
