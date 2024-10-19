import React from 'react';
import Link from 'next/link';

// components
import LoadingComponent from '@/app/components/common/LoadingComponent';

interface BlogHeaderProps {
    isLoading: boolean;
    isLoggedIn: boolean;
    loginUser: string | null;
    handleCreateBlog: () => void;
    handleLogout: () => void;
    handleLogin: () => void;
}

/**
 * ブログヘッダーコンポーネント
 * @param isLoading
 * @param isLoggedIn
 * @param loginUser
 * @param handleCreateBlog
 * @param handleLogout
 * @param handleLogin
 * @returns JSX
 */
const BlogHeader = ({
    isLoading,
    isLoggedIn,
    loginUser,
    handleCreateBlog,
    handleLogout,
    handleLogin,
}: BlogHeaderProps) => {
    return (
        <header className="bg-[#1a1a1a] text-white p-4 flex justify-between items-center">
            <Link href={'/blog'}>
                <h1 className="text-2xl font-bold">Tech Blog</h1>
            </Link>

            {isLoading ? (
                <div className="text-sm mr-2">
                    <LoadingComponent />
                </div>
            ) : (
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <>
                            <div className="text-sm mr-2">
                                <Link href={'/user/detail'}>
                                    {<p>{loginUser} さん、こんにちは！</p>}
                                </Link>
                            </div>
                            <button
                                onClick={handleCreateBlog}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                新規ブログ作成
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                ログアウト
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            ログイン
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default BlogHeader;
