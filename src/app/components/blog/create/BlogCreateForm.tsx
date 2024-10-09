'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

/**
 * ブログ作成フォームコンポーネント
 * @returns JSX
 */
const BlogCreateForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        title: string;
        githubMarkdown: string;
        category: string;
        tags: string[];
    }>({
        title: '',
        githubMarkdown: '',
        category: '',
        tags: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm('本当に追加してよろしいですか？')) {
            //onSave(formData);
            router.push('/blog');
        }
    };

    const { isLoggedIn, user, handleLoginForm, handleLogout } = useUser({ loginUser: 'ユーザー' });

    return (
        <BlogFormLayout
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={() => {}}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
        >
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
                            htmlFor="githubMarkdown"
                        >
                            GitHubのMarkdown (URL)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="githubMarkdown"
                            type="url"
                            name="githubMarkdown"
                            value={formData.githubMarkdown}
                            onChange={handleChange}
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
                            value={formData.tags.join(',')}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value.split(',') })
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
        </BlogFormLayout>
    );
};

export default BlogCreateForm;
