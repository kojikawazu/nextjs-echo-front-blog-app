'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
import { BlogType } from '@/app/types/blogs-types';
import { BlogLikeType } from '@/app/types/blogs-likes-types';
// utils
import {
    handleCreateBlogForm,
    handleEditBlogForm,
    paginateBlogs,
} from '@/app/utils/blog/handle-blog';
import { fetchBlogs } from '@/app/utils/blog/fetch-blog';
import { deleteBlogServerAction } from '@/app/utils/blog/fetch-blog-server-action';
import { conversionFromRawBlogTypeToBlogType } from '@/app/utils/conversion/conversion';
import { fetchBlogLikes, generateVisitId } from '@/app/utils/blog-like/fetch-blog-like';
import {
    createBlogLikeByIdServerAction,
    deleteBlogLikeByIdServerAction,
} from '@/app/utils/blog-like/fetch-blog-likes-server-action';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
import { useBlogCategory } from '@/app/hooks/blog/useBlogCategory';
// components
import LoadingComponent from '@/app/components/common/LoadingComponent';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';

type BlogMainProps = {
    selectCategory: string;
    inAuthUser: UserAuthType | null;
};

/**
 * ブログメインコンポーネント
 * @param selectCategory
 * @param inAuthUser
 * @returns JSX
 */
const BlogMain = ({ selectCategory, inAuthUser }: BlogMainProps) => {
    // ページングの最大表示数
    const maxPaginationBlog = parseInt(process.env.MAX_PAGINATION_BLOG as string) || 6;

    // Router(カスタムフック)
    const router = useRouter();
    // カテゴリー選択状態
    const [selectedCategory, setSelectedCategory] = useState(
        selectCategory ? selectCategory : CommonConstants.BLOG_LIST.CATEGORY_ALL,
    );
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
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser({
        inAuthUser,
    });
    // ブログカテゴリ
    const { blogCategories } = useBlogCategory();

    // カテゴリーによるフィルタリング
    const filteredBlogs =
        selectedCategory === CommonConstants.BLOG_LIST.CATEGORY_ALL
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory);
    // ページネーションされたブログリスト
    const paginatedBlogs = paginateBlogs(
        filteredBlogs,
        currentPage,
        CommonConstants.BLOG_LIST.ITEMS_PER_PAGE,
    );
    // ページ数
    const totalPages = Math.ceil(filteredBlogs.length / CommonConstants.BLOG_LIST.ITEMS_PER_PAGE);

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

        if (!isLoading) {
            localFetch();
        }
    }, [isLoading, setIsLoadingVisitId]);

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
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            } finally {
                setIsLoadingBlogs(false);
            }
        };

        if (!isLoading && !isLoadingVisitId) {
            localFetch();
        }
    }, [isLoading, isLoadingVisitId, setIsLoadingBlogs]);

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

        if (!isLoading && !isLoadingVisitId) {
            localFetch();
        }
    }, [isLoading, isLoadingVisitId, setIsLoadingBlogLikes]);

    /**
     * ブログ削除ハンドル
     * @param blogId
     */
    const handleDeleteBlog = async (blogId: string) => {
        if (confirm(CommonConstants.CONFIRM_MESSAGE.BLOG_DELETE)) {
            try {
                const ret = await deleteBlogServerAction(blogId);
                if (ret) {
                    toast.success(CommonConstants.TOAST_MESSAGE.DELETE_BLOG_SUCCESSED);
                    setBlogs(blogs.filter((blog) => blog.id !== blogId));
                } else {
                    toast.error(CommonConstants.TOAST_MESSAGE.DELETE_BLOG_FAILURE);
                }
            } catch (error) {
                toast.error(CommonConstants.TOAST_MESSAGE.ADD_BLOG_FAILURE);
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
                ? await createBlogLikeByIdServerAction(localBlogId)
                : await deleteBlogLikeByIdServerAction(localBlogId);
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

    return (
        <BlogMainLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => handleCreateBlogForm(router)}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
            categories={blogCategories}
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
                                {(() => {
                                    const startPage = Math.max(
                                        1,
                                        currentPage - Math.floor(maxPaginationBlog / 2),
                                    );
                                    const endPage = Math.min(
                                        totalPages,
                                        startPage + maxPaginationBlog - 1,
                                    );
                                    const adjustedStartPage = Math.max(
                                        1,
                                        endPage - maxPaginationBlog + 1,
                                    );

                                    return [...Array(endPage - adjustedStartPage + 1)].map(
                                        (_, index) => {
                                            const pageNumber = adjustedStartPage + index;
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                    className={`px-2 py-1 rounded ${
                                                        currentPage === pageNumber
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-300'
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        },
                                    );
                                })()}
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
