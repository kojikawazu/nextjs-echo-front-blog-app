'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/app/hooks/user/useUser';
import { handleCreateBlogForm } from '@/app/utils/blog/handle-blog';
import { handleUserEditForm } from '@/app/utils/user/handle-user';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

/**
 * ユーザー詳細コンポーネント
 * @returns JSX
 */
const UserDetail = () => {
    // Router(カスタムフック)
    const router = useRouter();
    // ユーザー情報
    const { isLoading, isLoggedIn, authUser, handleLogout } = useUser();

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => handleCreateBlogForm(router)}
            handleLogout={handleLogout}
            handleLogin={() => {}}
        >
            {isLoading ? (
                <div className="flex-grow p-4 flex items-center justify-center">Loading...</div>
            ) : (
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
                            <p className="text-gray-700 text-lg">
                                名前: {authUser ? authUser.username : 'non user'}
                            </p>
                            <p className="mt-2 text-gray-700 text-lg">
                                メールアドレス: {authUser ? authUser.email : 'non email'}
                            </p>
                        </div>
                        <div className="flex items-center justify-center space-x-6">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleUserEditForm(router)}
                            >
                                情報を変更する
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </BlogFormLayout>
    );
};

export default UserDetail;
