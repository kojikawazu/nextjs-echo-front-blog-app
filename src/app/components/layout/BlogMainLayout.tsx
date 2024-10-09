import React from 'react';
import BlogHeader from './BlogHeader';
import BlogSideBar from './BlogSideBar';
import BlogFooter from './BlogFooter';

interface BlogMainLayoutProps {
    isLoggedIn: boolean;
    handleCreateBlog: () => void;
    handleLogout: () => void;
    handleLogin: () => void;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    children: React.ReactNode;
}

/**
 * ブログメインレイアウトコンポーネント
 * @param isLoggedIn
 * @param handleCreateBlog
 * @param handleLogout
 * @param handleLogin
 * @param categories
 * @param selectedCategory
 * @param setSelectedCategory
 * @param children
 * @returns JSX
 */
const BlogMainLayout = ({
    isLoggedIn,
    handleCreateBlog,
    handleLogout,
    handleLogin,
    categories,
    selectedCategory,
    setSelectedCategory,
    children,
}: BlogMainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <BlogHeader
                isLoggedIn={isLoggedIn}
                handleCreateBlog={handleCreateBlog}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
            />

            <div className="flex flex-grow">
                <BlogSideBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                {children}
            </div>

            <BlogFooter />
        </div>
    );
};

export default BlogMainLayout;
