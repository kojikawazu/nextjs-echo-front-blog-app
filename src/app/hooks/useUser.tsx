'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * カスタムフック: ユーザー情報管理
 */
export const useUser = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<string | null>(null);
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
                    setUser(data.content.username);
                } else {
                    console.warn('Authentication failed:', response.status);
                    setIsLoggedIn(false);
                    setUser(null);
                    moveToLogin();
                }
            } catch (error) {
                console.error('認証状態の確認に失敗しました: ', error);
                setIsLoggedIn(false);
                setUser(null);
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

            console.log('auth login post response status:', response.status);
            //console.log('auth login post response headers:', response.headers);
            //console.log('auth login post response body:', response.body);

            if (response.ok) {
                await response.json();
                setIsLoggedIn(true);
                router.push('/blog');
            } else {
                setIsLoginError(true);
            }
        } catch (error) {
            console.error('ログイン処理に失敗しました:', error);
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

            console.log('auth logout get response status:', response.status);

            if (response.ok) {
                await response.json();
                setIsLoggedIn(false);
                setUser(null);
                router.push('/user/login');
            } else {
                alert('ログアウトに失敗しました。ユーザー名またはパスワードが正しくありません。');
            }
        } catch (error) {
            console.error('ログアウト処理に失敗しました:', error);
            alert('ログアウト中にエラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    /** ログイン画面へ */
    const moveToLogin = () => {
        router.push('/user/login');
    };

    return {
        isLoading,
        isLoggedIn,
        isLoginError,
        user,
        setIsLoggedIn,
        handleLoginForm,
        handleLogin,
        handleLogout,
    };
};
