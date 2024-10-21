'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
// utils
import {
    loginServerAction,
    logoutServerAction,
} from '@/app/utils/auth/fetch-auth-user-server-action';

interface useUserProps {
    inAuthUser: UserAuthType | null;
}

/**
 * ユーザー情報カスタムフック
 * @param inAuthUser
 * @returns ユーザー情報カスタムフック
 */
export const useUserS = ({ inAuthUser }: useUserProps) => {
    const router = useRouter();
    const [authUser] = useState<UserAuthType | null>(inAuthUser ? inAuthUser : null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(inAuthUser !== null);
    const [isLoginError, setIsLoginError] = useState(false);

    /** ログインフォームへ */
    const handleLoginForm = () => {
        moveToLogin();
    };

    /**
     * ログイン処理
     * @param email
     * @param password
     */
    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            const ret = await loginServerAction(email, password);

            if (ret) {
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

    /**
     * ログアウト処理
     */
    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const ret = await logoutServerAction();

            if (ret) {
                setIsLoggedIn(false);
                router.push(CommonConstants.URL_PATH.USER_LOGIN);
            } else {
                setIsLoginError(true);
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
