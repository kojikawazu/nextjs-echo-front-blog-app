import React from 'react';

interface BlogSideBarProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setCurrentPage: (currentPage: number) => void;
}

/**
 * ブログサイドバーコンポーネント
 * @param categories
 * @param selectedCategory
 * @param setSelectedCategory
 * @param setCurrentPage
 * @returns JSX
 */
const BlogSideBar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    setCurrentPage,
}: BlogSideBarProps) => {
    return (
        <aside className="w-64 bg-white p-4 hidden md:block">
            <h2 className="font-bold mb-4">技術カテゴリー</h2>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={`mb-2 cursor-pointer ${selectedCategory === category ? 'text-blue-700 font-bold' : 'text-blue-600 hover:underline'}`}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                        }}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default BlogSideBar;
