'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';
import { BlogCreateFormType } from '@/app/types/blogs-types';
import { toast } from 'react-toastify';

/**
 * ブログ作成フォームコンポーネント
 * @returns JSX
 */
const BlogCreateForm = () => {
    // Router(カスタムフック)
    const router = useRouter();
    // フォームデータ
    const [formData, setFormData] = useState<BlogCreateFormType>({
        title: '',
        description: '',
        githubUrl: '',
        category: '',
        tags: '',
    });
    // ユーザー情報
    const { isLoading, isLoggedIn, user, handleLoginForm, handleLogout } = useUser();

    // フォームの変更
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm('本当に追加してよろしいですか？')) {
            // API 送信
            const response = await fetch(`/api/blog/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(`response.status: ${response.status}`);
            //console.log(`response.headers: ${response.headers}`);
            if (response.ok) {
                console.log('response.ok');
                //setFormData({} as BlogCreateFormType);
                toast.success('ブログを追加しました。');
                router.push('/blog');
            } else {
                console.log('response.error');
                toast.error('ブログの追加に失敗しました。');
            }
        }
    };

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={() => {}}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
        >
            {isLoading ? (
                <div className="flex-grow p-4 flex items-center justify-center">Loading...</div>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
