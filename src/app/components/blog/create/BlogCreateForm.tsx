'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { BlogCreateFormType } from '@/app/types/blogs-types';
// utils
import { handleFormChange } from '@/app/utils/form/handle-form';
import { createBlog } from '@/app/utils/blog/fetch-blog';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
import { useBlogCreateForm } from '@/app/hooks/blog/useBlogCreateForm';
// components
import LoadingComponent from '@/app/components/common/LoadingComponent';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

/**
 * ブログ作成フォームコンポーネント
 * @returns JSX
 */
const BlogCreateForm = () => {
    // Router(カスタムフック)
    const router = useRouter();
    // ブログ作成フォームカスタムフック
    const { formData, setFormData } = useBlogCreateForm();
    // ユーザー情報カスタムフック
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirm(CommonConstants.CONFIRM_MESSAGE.BLOG_ADD)) {
            try {
                const ret = await createBlog(formData);

                if (ret) {
                    router.push(CommonConstants.URL_PATH.BLOG_HOME);
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            }
        }
    };

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => {}}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
        >
            {isLoading ? (
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

                    {/** フォーム */}
                    <form
                        onSubmit={handleSubmit}
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
                                    handleFormChange<BlogCreateFormType>(e, formData, setFormData)
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
                                    handleFormChange<BlogCreateFormType>(e, formData, setFormData)
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
                                    handleFormChange<BlogCreateFormType>(e, formData, setFormData)
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
                                    handleFormChange<BlogCreateFormType>(e, formData, setFormData)
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
                                    handleFormChange<BlogCreateFormType>(e, formData, setFormData)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                投稿する
                            </button>
                        </div>
                    </form>
                </main>
            )}
        </BlogFormLayout>
    );
};

export default BlogCreateForm;
