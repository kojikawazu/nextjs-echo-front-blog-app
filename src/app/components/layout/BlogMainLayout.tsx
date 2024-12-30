import React from 'react';
import BlogHeader from './BlogHeader';
import BlogSideBar from './BlogSideBar';
import BlogFooter from './BlogFooter';

interface BlogMainLayoutProps {
    isLoading: boolean;
    isLoggedIn: boolean;
    loginUser: string | null;
    handleCreateBlog: () => void;
    handleLogout: () => void;
    handleLogin: () => void;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setCurrentPage: (currentPage: number) => void;
    children: React.ReactNode;
}

/**
 * ブログメインレイアウトコンポーネント
 * @param isLoading
 * @param isLoggedIn
 * @param loginUser
 * @param handleCreateBlog
 * @param handleLogout
 * @param handleLogin
 * @param categories
 * @param selectedCategory
 * @param setSelectedCategory
 * @param setCurrentPage
 * @param children
 * @returns JSX
 */
const BlogMainLayout = ({
    isLoading,
    isLoggedIn,
    loginUser,
    handleCreateBlog,
    handleLogout,
    handleLogin,
    categories,
    selectedCategory,
    setSelectedCategory,
    setCurrentPage,
    children,
}: BlogMainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <BlogHeader
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                loginUser={loginUser}
                handleCreateBlog={handleCreateBlog}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
            />

            <div className="flex flex-grow">
                <BlogSideBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setCurrentPage={setCurrentPage}
                />
                <section className="flex-1 p-4 max-w-4xl mx-auto">{children}</section>
            </div>

            <BlogFooter />
        </div>
    );
};

export default BlogMainLayout;
