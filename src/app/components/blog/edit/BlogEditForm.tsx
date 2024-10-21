'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { BlogCreateFormType } from '@/app/types/blogs-types';
// utils
import { handleCreateBlogForm } from '@/app/utils/blog/handle-blog';
import { handleFormChange } from '@/app/utils/form/handle-form';
import { fetchBlogById } from '@/app/utils/blog/fetch-blog';
import { updateBlogServerAction } from '@/app/utils/blog/fetch-blog-server-action';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
import { useBlogEditForm } from '@/app/hooks/blog/useBlogEditForm';
// components
import LoadingComponent from '@/app/components/common/LoadingComponent';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

interface BlogEditFormProps {
    editBlogId: string;
}

/**
 * ブログ編集フォームコンポーネント
 * @param editBlogId
 * @returns JSX
 */
const BlogEditForm = ({ editBlogId }: BlogEditFormProps) => {
    // Router(カスタムフック)
    const router = useRouter();
    // 編集中のブログID
    const [blogId] = useState(editBlogId);

    // ブログ編集フォームカスタムフック
    const { isLoadingBlogData, formData, setIsLoadingBlogData, setFormData } = useBlogEditForm();
    // ユーザー情報カスタムフック
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();

    // ブログデータ取得
    useEffect(() => {
        const localFetchBlogById = async () => {
            try {
                const responseData = await fetchBlogById(blogId);
                if (responseData) {
                    setFormData({
                        title: responseData.title,
                        description: responseData.description,
                        githubUrl: responseData.github_url,
                        category: responseData.category,
                        tags: responseData.tags,
                    });
                    setIsLoadingBlogData(false);
                } else {
                    console.error('Failed to fetch blog by id');
                    router.push(CommonConstants.URL_PATH.BLOG_HOME);
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
                router.push(CommonConstants.URL_PATH.BLOG_HOME);
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetchBlogById();
        }
    }, [blogId, isLoading, isLoggedIn, router, setFormData, setIsLoadingBlogData]);

    /**
     * Submit処理
     * @param formData フォームデータ
     */
    const handleSubmit = async (formData: FormData) => {
        if (confirm(CommonConstants.CONFIRM_MESSAGE.BLOG_UPDATE)) {
            try {
                //const ret = await updateBlog(blogId, formData);
                const ret = await updateBlogServerAction(formData, blogId);

                if (ret) {
                    toast.success(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_SUCCESSED);
                    router.push(CommonConstants.URL_PATH.BLOG_HOME);
                } else {
                    toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_FAILURE);
                }
            } catch (error) {
                toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_BLOG_FAILURE);
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            }
        }
    };

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => handleCreateBlogForm(router)}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
        >
            {isLoading && isLoadingBlogData ? (
                <div className="flex-grow p-4 flex items-center justify-center">
                    <LoadingComponent />
                </div>
            ) : (
                <main className="p-4">
                    {/** 戻る */}
                    <div className="mb-4">
                        <button
                            className="mb-4 text-blue-600 hover:underline"
                            onClick={() => window.history.back()}
                        >
                            &larr; 戻る
                        </button>
                    </div>

                    {isLoadingBlogData ? (
                        <div className="flex-grow p-4 flex items-center justify-center">
                            <LoadingComponent />
                        </div>
                    ) : (
                        <>
                            {/** フォーム */}
                            <form
                                action={handleSubmit}
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="title"
                                    >
                                        タイトル
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            handleFormChange<BlogCreateFormType>(
                                                e,
                                                formData,
                                                setFormData,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="description"
                                    >
                                        説明
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            handleFormChange<BlogCreateFormType>(
                                                e,
                                                formData,
                                                setFormData,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="githubUrl"
                                    >
                                        GitHubのMarkdown (URL)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="githubUrl"
                                        type="url"
                                        name="githubUrl"
                                        value={formData.githubUrl}
                                        onChange={(e) =>
                                            handleFormChange<BlogCreateFormType>(
                                                e,
                                                formData,
                                                setFormData,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="category"
                                    >
                                        カテゴリー
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="category"
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={(e) =>
                                            handleFormChange<BlogCreateFormType>(
                                                e,
                                                formData,
                                                setFormData,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="tags"
                                    >
                                        タグ (カンマ区切り)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="tags"
                                        type="text"
                                        name="tags"
                                        value={formData.tags.split(',')}
                                        onChange={(e) =>
                                            handleFormChange<BlogCreateFormType>(
                                                e,
                                                formData,
                                                setFormData,
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        変更する
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </main>
            )}
        </BlogFormLayout>
    );
};

export default BlogEditForm;
