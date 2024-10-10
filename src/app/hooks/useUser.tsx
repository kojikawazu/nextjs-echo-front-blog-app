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

    useEffect(() => {
        // ページ読み込み時に認証状態を確認
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/auth-check`,
                    {
                        method: 'GET',
                        credentials: 'include', // クッキーを含める
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                    setUser(data.username);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                    moveToLogin();
                }
            } catch (error) {
                console.error('認証状態の確認に失敗しました:', error);
                setIsLoggedIn(false);
                setUser(null);
                moveToLogin();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
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
                alert('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。');
            }
        } catch (error) {
            console.error('ログイン処理に失敗しました:', error);
            alert('ログイン中にエラーが発生しました。');
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
            setIsLoading(false); // ログアウト処理完了時に isLoading を false に設定
        }
    };

    /** ログイン画面へ */
    const moveToLogin = () => {
        router.push('/user/login');
    };

    return {
        isLoading,
        isLoggedIn,
        user,
        setIsLoggedIn,
        handleLoginForm,
        handleLogin,
        handleLogout,
    };
};
