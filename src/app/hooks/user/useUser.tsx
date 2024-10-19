'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';

/**
 * カスタムフック: ユーザー情報管理
 */
export const useUser = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState<UserAuthType | null>(null);
    const [isLoginError, setIsLoginError] = useState(false);

    useEffect(() => {
        // ページ読み込み時に認証状態を確認
        const checkAuth = async () => {
            try {
                const response = await fetch(`/api/auth/getuser`, {
                    method: 'GET',
                    credentials: 'include',
                });

                console.log('fetch auth user GET response status:', response.status);
                //console.log('fetch auth user GET response status:', response.headers);
                //console.log('fetch auth user GET response body:', response.body);

                if (response.ok) {
                    const data = await response.json();
                    //console.log('fetch auth user GET data:', data);
                    setIsLoggedIn(true);
                    setAuthUser({
                        user_id: data.content.user_id,
                        username: data.content.username,
                        email: data.content.email,
                    });
                } else {
                    console.warn('Authentication failed:', response.status);
                    setIsLoggedIn(false);
                    moveToLogin();
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
                setIsLoggedIn(false);
                moveToLogin();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
