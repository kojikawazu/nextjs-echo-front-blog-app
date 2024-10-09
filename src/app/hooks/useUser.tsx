'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface useUserProps {
    loginUser: string | null;
}

/**
 * カスタムフック: ユーザー情報管理
 * @param loginUser
 * @returns isLoggedIn: boolean, user: string | null, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, handleLogin: (loginUser: string) => void, handleLogout: () => void
 */
export const useUser = ({ loginUser }: useUserProps) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(!loginUser ? false : true);
    const [user, setUser] = useState<string | null>(loginUser);

    const handleLogin = (loginUser: string) => {
        setIsLoggedIn(true);
        setUser(loginUser);
        router.push('/blog');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        router.push('/blog');
    };

    return {
        isLoggedIn,
        user,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
    };
};
