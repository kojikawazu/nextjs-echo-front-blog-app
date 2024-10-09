import React from 'react';
import BlogHeader from './BlogHeader';
import BlogFooter from './BlogFooter';

interface BlogFormLayoutProps {
    isLoggedIn: boolean;
    loginUser: string | null;
    handleCreateBlog: () => void;
    handleLogout: () => void;
    handleLogin: () => void;
    children: React.ReactNode;
}

/**
 * ブログフォームレイアウトコンポーネント
 * @param isLoggedIn
 * @param loginUser
 * @param handleCreateBlog
 * @param handleLogout
 * @param handleLogin
 * @param children
 * @returns JSX
 */
const BlogFormLayout = ({
    isLoggedIn,
    loginUser,
    handleCreateBlog,
    handleLogout,
    handleLogin,
    children,
}: BlogFormLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <BlogHeader
                isLoggedIn={isLoggedIn}
                loginUser={loginUser}
                handleCreateBlog={handleCreateBlog}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
            />

            {children}
            <BlogFooter />
        </div>
    );
};

export default BlogFormLayout;
