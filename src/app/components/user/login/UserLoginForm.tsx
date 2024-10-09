'use client';

import React, { useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

/**
 * ユーザーログインフォームコンポーネント
 * @returns JSX
 */
const UserLoginForm = () => {
    const [formData, setFormData] = useState<{
        username: string;
        password: string;
    }>({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.username == '') {
            alert('ユーザーネームを入力してください');
        }

        if (formData.password == '') {
            alert('パスワードを入力してください');
        }

        handleLogin(formData.username);
    };

    const { isLoggedIn, user, handleLoginForm, handleLogin } = useUser({ loginUser: null });

    return (
        <BlogFormLayout
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={() => {}}
            handleLogout={() => {}}
            handleLogin={handleLoginForm}
        >
            <main className="flex-grow p-4 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            ユーザーネーム
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            パスワード
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            ログイン
                        </button>
                    </div>
                </form>
            </main>
        </BlogFormLayout>
    );
};

export default UserLoginForm;
