'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

interface UserDetailProps {
    token: RequestCookie | undefined;
}

/**
 * ユーザー詳細コンポーネント
 * @returns JSX
 */
const UserDetail = ({ token }: UserDetailProps) => {
    const router = useRouter();
    const { isLoading, isLoggedIn, user, handleLogout } = useUser({ token });

    const handleCreateBlog = () => {
        router.push('/blog/create');
    };

    const handleUserEdit = () => {
        router.push('/user/edit/1');
    };

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={handleCreateBlog}
            handleLogout={handleLogout}
            handleLogin={() => {}}
        >
            <main className="flex-grow p-6">
                {/** 戻る */}
                <div className="mb-4">
                    <button
                        className="mb-4 text-blue-600 hover:underline"
                        onClick={() => window.history.back()}
                    >
                        &larr; 戻る
                    </button>
                </div>

                <div className="bg-white shadow-md rounded px-10 pt-8 pb-10 mb-6">
                    <h2 className="text-xl font-bold mb-6">ユーザー詳細</h2>
                    <div className="mb-6">
                        <p className="text-gray-700 text-lg">名前: {user}</p>
                        <p className="mt-2 text-gray-700 text-lg">
                            メールアドレス: example@example.com
                        </p>
                    </div>
                    <div className="flex items-center justify-center space-x-6">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleUserEdit}
                        >
                            情報を変更する
                        </button>
                    </div>
                </div>
            </main>
        </BlogFormLayout>
    );
};

export default UserDetail;
