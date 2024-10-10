'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * カスタムフック: ユーザー情報管理
 */
export const useUser = () => {
    const router = useRouter();
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
                }
            } catch (error) {
                console.error('認証状態の確認に失敗しました:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    /** ログインフォームへ */
    const handleLoginForm = () => {
        router.push('/user/login');
    };

    /** ログイン処理 */
    const handleLogin = async (email: string, password: string) => {
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
            router.push('/blog');
        } else {
            alert('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。');
        }
    };

    /** ログアウト処理 */
    const handleLogout = async () => {
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
    };

    return {
        isLoggedIn,
        user,
        setIsLoggedIn,
        handleLoginForm,
        handleLogin,
        handleLogout,
    };
};
