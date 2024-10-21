'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';

interface useUserProps {
    inputAuthUser: UserAuthType | null;
}

/**
 * ユーザー情報カスタムフック
 * @param inputAuthUser
 * @returns ユーザー情報カスタムフック
 */
export const useUserS = ({ inputAuthUser }: useUserProps) => {
    const router = useRouter();
    const [authUser] = useState<UserAuthType | null>(inputAuthUser ? inputAuthUser : null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(inputAuthUser !== null);
    const [isLoginError, setIsLoginError] = useState(false);

    /** ログインフォームへ */
    const handleLoginForm = () => {
        moveToLogin();
    };

    /** ログイン処理 */
    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            console.log('auth login post response status: ', response.status);
            //console.log('auth login post response headers:', response.headers);
            //console.log('auth login post response body:', response.body);

            if (response.ok) {
                await response.json();
                setIsLoggedIn(true);
                router.push(CommonConstants.URL_PATH.BLOG_HOME);
            } else {
                setIsLoginError(true);
            }
        } catch (error) {
            console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            setIsLoginError(true);
        } finally {
            setIsLoading(false);
        }
    };

    /** ログアウト処理 */
    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            console.log('auth logout get response status: ', response.status);

            if (response.ok) {
                await response.json();
                setIsLoggedIn(false);
                router.push(CommonConstants.URL_PATH.USER_LOGIN);
            }
        } catch (error) {
            console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        } finally {
            setIsLoading(false);
        }
    };

    /** ログイン画面へ */
    const moveToLogin = () => {
        router.push(CommonConstants.URL_PATH.USER_LOGIN);
    };

    return {
        isLoading,
        isLoggedIn,
        isLoginError,
        authUser,
        setIsLoggedIn,
        handleLoginForm,
        handleLogin,
        handleLogout,
    };
};
