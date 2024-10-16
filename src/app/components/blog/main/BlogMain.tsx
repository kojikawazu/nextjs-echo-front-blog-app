'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BlogType, RawBlogType } from '@/app/types/blogs-types';
import { useUser } from '@/app/hooks/useUser';
import { handleCreateBlogForm, handleEditBlogForm } from '@/app/utils/blog/handle-blog';
import { deleteBlog } from '@/app/utils/blog/fetch-blog';
import { conversionFromRawBlogTypeToBlogType } from '@/app/utils/conversion/conversion';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';

/**
 * ブログメインコンポーネント
 * @returns JSX
 */
const BlogMain = () => {
    // Router(カスタムフック)
    const router = useRouter();
    // カテゴリー選択状態
    const [selectedCategory, setSelectedCategory] = useState('全て');
    // カテゴリー一覧
    const [categories, setCategories] = useState<string[]>(['全て']);
    // ブログ一覧
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    // ページネーション
    const [currentPage, setCurrentPage] = useState(1);
    // ユーザー情報
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();
    // 1ページあたりの表示数
    const itemsPerPage = 4;

    useEffect(() => {
        /**
         * ブログ一覧を取得する
         */
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`/api/blogs`, {
                    method: 'GET',
                    credentials: 'include',
                });

                //console.log('fetch blogs GET response status:', response.status);
                //console.log('fetch blogs GET response headers:', response.headers);

                if (response.ok) {
                    const responseData: RawBlogType[] = await response.json();
                    //console.log('fetch blogs GET response data:', responseData);

                    // RawBlogType から BlogType に変換
                    const changedBlogs: BlogType[] = responseData.map(
                        conversionFromRawBlogTypeToBlogType,
                    );
                    //console.log('changed blogs data:', changedBlogs);
                    setBlogs(changedBlogs);

                    // カテゴリを抽出して追加
                    const newCategories = [...new Set(changedBlogs.map((blog) => blog.category))]; // 重複排除
                    setCategories(['全て', ...newCategories]); // 「全て」を先頭に追加
                } else {
                    console.warn('Failed to fetch blogs:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };

        if (!isLoading && isLoggedIn) {
            fetchBlogs();
        }
    }, [isLoading, isLoggedIn]);

    // ブログ一覧をカテゴリーで絞り込み
    const handleDeleteBlog = async (blogId: string) => {
        if (confirm('本当に削除しますか？')) {
            try {
                const ret = await deleteBlog(blogId);
                if (ret) {
                    setBlogs(blogs.filter((blog) => blog.id !== blogId));
                }
            } catch (error) {
                console.error('Failed to delete blog:', error);
            }
        }
    };

    const handleLikeBlog = (blogId: string) => {
        setBlogs(
            blogs.map((blog) => (blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)),
        );
    };

    const paginateBlogs = (blogs: BlogType[], page: number, itemsPerPage: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        return blogs.slice(startIndex, startIndex + itemsPerPage);
    };

    const filteredBlogs =
        selectedCategory === '全て'
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory);
    const paginatedBlogs = paginateBlogs(filteredBlogs, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    return (
        <BlogMainLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => handleCreateBlogForm(router)}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        >
            {isLoading ? (
                <div className="flex-grow p-4 flex items-center justify-center">Loading...</div>
            ) : (
                <main className="flex-grow p-4">
                    {/** ブログリスト */}
                    {paginatedBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white shadow-md m-2 p-4 rounded cursor-pointer"
                        >
                            {/** タグ */}
                            <Link href={`/blog/detail/${blog.id}`}>
                                <h2 className="font-bold text-xl mb-2 text-blue-700">
                                    {blog.title}
                                </h2>
                            </Link>
                            <p className="text-gray-700 mb-2">{blog.description}</p>
                            <div className="flex flex-wrap mb-2">
                                {blog.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="bg-gray-200 text-sm rounded-full px-3 py-1 mr-2 mb-2"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/** いいね */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">❤️ {blog.likes}</span>

                                <div className="flex items-center">
                                    {isLoggedIn && (
                                        <>
                                            <button
                                                onClick={() => handleEditBlogForm(router, blog.id)}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                                            >
                                                編集
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBlog(blog.id)}
                                                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded ml-2"
                                            >
                                                削除
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => handleLikeBlog(blog.id)}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2"
                                    >
                                        いいね!
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/** ページング */}
                    <div className="mt-4 flex justify-center space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-2 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </main>
            )}
        </BlogMainLayout>
    );
};

export default BlogMain;
