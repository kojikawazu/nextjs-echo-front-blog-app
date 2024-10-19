'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { BlogType } from '@/app/types/blogs-types';
import { BlogLikeType } from '@/app/types/blogs-likes-types';
// utils
import { handleCreateBlogForm, handleEditBlogForm } from '@/app/utils/blog/handle-blog';
import { deleteBlog, fetchBlogs } from '@/app/utils/blog/fetch-blog';
import { conversionFromRawBlogTypeToBlogType } from '@/app/utils/conversion/conversion';
import {
    createBlogLikeById,
    deleteBlogLikeById,
    fetchBlogLikes,
    generateVisitId,
} from '@/app/utils/blog-like/fetch-blog-like';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
// components
import LoadingComponent from '@/app/components/common/LoadingComponent';
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
    // いいねリスト
    const [blogLikes, setBlogLikes] = useState<string[]>([]);
    //  VisitIdローディング
    const [isLoadingVisitId, setIsLoadingVisitId] = useState(true);
    // ブログローディング
    const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
    // いいねローディング
    const [isLoadingBlogLikes, setIsLoadingBlogLikes] = useState(true);

    // ユーザー情報
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();

    useEffect(() => {
        const localFetch = async () => {
            try {
                generateVisitId();
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            } finally {
                setIsLoadingVisitId(false);
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetch();
        }
    }, [isLoading, isLoggedIn, setIsLoadingVisitId]);

    useEffect(() => {
        const localFetch = async () => {
            try {
                const [responseBlogsData] = await Promise.all([fetchBlogs()]);

                /**
                 * ブログ一覧を取得する
                 */
                if (responseBlogsData) {
                    // RawBlogType から BlogType に変換
                    const changedBlogs: BlogType[] = responseBlogsData.map(
                        conversionFromRawBlogTypeToBlogType,
                    );
                    //console.log('changed blogs data:', changedBlogs);
                    setBlogs(changedBlogs);

                    // カテゴリを抽出して追加
                    const newCategories = [...new Set(changedBlogs.map((blog) => blog.category))]; // 重複排除
                    setCategories(['全て', ...newCategories]); // 「全て」を先頭に追加
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            } finally {
                setIsLoadingBlogs(false);
            }
        };

        if (!isLoading && isLoggedIn && !isLoadingVisitId) {
            localFetch();
        }
    }, [isLoading, isLoggedIn, isLoadingVisitId, setIsLoadingBlogs]);

    useEffect(() => {
        const localFetch = async () => {
            try {
                const [responseBlogLikes] = await Promise.all([fetchBlogLikes()]);

                /**
                 * ブログいいね一覧を取得する
                 */
                if (responseBlogLikes) {
                    const blogLikes: BlogLikeType[] = responseBlogLikes;
                    const uniqueBlogIds: string[] = [
                        ...new Set(
                            blogLikes.map(
                                (responseBlogLike: BlogLikeType) => responseBlogLike.blog_id,
                            ),
                        ),
                    ];
                    setBlogLikes(uniqueBlogIds);
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            } finally {
                setIsLoadingBlogLikes(false);
            }
        };

        if (!isLoading && isLoggedIn && !isLoadingVisitId) {
            localFetch();
        }
    }, [isLoading, isLoggedIn, isLoadingVisitId, setIsLoadingBlogLikes]);

    /**
     * ブログ削除ハンドル
     * @param blogId
     */
    const handleDeleteBlog = async (blogId: string) => {
        if (confirm(CommonConstants.CONFIRM_MESSAGE.BLOG_DELETE)) {
            try {
                const ret = await deleteBlog(blogId);
                if (ret) {
                    setBlogs(blogs.filter((blog) => blog.id !== blogId));
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.DEL_BLOG_FAILURE}: `, error);
            }
        }
    };

    /**
     * ブログいいねハンドル
     * @param localBlogId
     * @returns void
     */
    const handleBlogLike = async (localBlogId: string) => {
        try {
            const ret = !blogLikes.includes(localBlogId)
                ? await createBlogLikeById(localBlogId)
                : await deleteBlogLikeById(localBlogId);
            if (ret) {
                if (!blogLikes.includes(localBlogId)) {
                    setBlogLikes([...blogLikes, localBlogId]);
                    setBlogs(
                        blogs.map((blog) =>
                            blog.id === localBlogId ? { ...blog, likes: blog.likes + 1 } : blog,
                        ),
                    );
                } else {
                    setBlogLikes(blogLikes.filter((blogId) => blogId !== localBlogId));
                    setBlogs(
                        blogs.map((blog) =>
                            blog.id === localBlogId ? { ...blog, likes: blog.likes - 1 } : blog,
                        ),
                    );
                }
            }
        } catch (error) {
            console.error(`${CommonConstants.ERROR_MESSAGE.BLOG_LIKE_FAILURE}: `, error);
        }
    };

    /** TODO start */
    const paginateBlogs = (blogs: BlogType[], page: number, itemsPerPage: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        return blogs.slice(startIndex, startIndex + itemsPerPage);
    };

    const filteredBlogs =
        selectedCategory === '全て'
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory);
    const paginatedBlogs = paginateBlogs(
        filteredBlogs,
        currentPage,
        CommonConstants.BLOG_LIST.ITEMS_PER_PAGE,
    );
    const totalPages = Math.ceil(filteredBlogs.length / CommonConstants.BLOG_LIST.ITEMS_PER_PAGE);
    /** TODO end */

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
            {isLoading || isLoadingVisitId ? (
                <div className="flex-grow p-4 flex items-center justify-center">
                    <LoadingComponent />
                </div>
            ) : (
                <main className="flex-grow p-4">
                    {isLoadingBlogs ? (
                        <div className="flex-grow p-4 flex items-center justify-center">
                            <LoadingComponent />
                        </div>
                    ) : (
                        <>
                            {/** ブログリスト */}
                            {paginatedBlogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="bg-white shadow-md m-2 p-4 rounded cursor-pointer"
                                >
                                    {/** タイトル */}
                                    <Link href={`/blog/detail/${blog.id}`}>
                                        <h2 className="font-bold text-xl mb-2 text-blue-700">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    {/** 概要 */}
                                    <p className="text-gray-700 mb-2">{blog.description}</p>
                                    {/** タグ */}
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

                                    <div className="flex justify-between items-center">
                                        {isLoadingBlogLikes ? (
                                            <div className="flex-grow p-4 flex items-center justify-center">
                                                <LoadingComponent />
                                            </div>
                                        ) : (
                                            <span
                                                className={`text-sm ${
                                                    blogLikes.includes(blog.id)
                                                        ? 'text-red-600'
                                                        : 'text-gray-600'
                                                }`}
                                            >
                                                ❤️ {blog.likes}
                                            </span>
                                        )}

                                        <div className="flex items-center">
                                            {isLoggedIn && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEditBlogForm(router, blog.id)
                                                        }
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

                                            {isLoadingBlogLikes ? (
                                                <div className="flex-grow p-4 flex items-center justify-center">
                                                    <LoadingComponent />
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlogLike(blog.id)}
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2"
                                                >
                                                    いいね!
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/** ページング start */}
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
                            {/** ページング end */}
                        </>
                    )}
                </main>
            )}
        </BlogMainLayout>
    );
};

export default BlogMain;
