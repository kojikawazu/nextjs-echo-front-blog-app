'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthUser } from '@/app/utils/fetchUser';

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
            const responseData = await fetchAuthUser();
            if (responseData !== null) {
                const data = responseData;
                setIsLoggedIn(true);
                setUser(data.username);
                setIsLoading(false);
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setIsLoading(false);
                moveToLogin();
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                await response.json();
                setIsLoggedIn(false);
                setUser(null);
                router.push('/blog');
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
