'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

interface UserEditFormProps {
    userId: string;
}

/**
 * ユーザー編集フォーム
 * @param userId
 * @returns JSX
 */
// 一時的
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserEditForm = ({ userId }: UserEditFormProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState<{
        username: string;
        email: string;
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }>({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { isLoading, isLoggedIn, user, handleLogout } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateBlog = () => {
        router.push('/blog/create');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.username == '') {
            alert('ユーザーネームを入力してください');
            return;
        }

        if (formData.email == '') {
            alert('メールアドレスを入力してください');
            return;
        }

        if (formData.currentPassword == '') {
            alert('現在のパスワードを入力してください');
            return;
        }

        if (formData.newPassword == '') {
            alert('新しいパスワードを入力してください');
            return;
        }

        if (formData.confirmPassword == '') {
            alert('パスワードをもう一度入力してください');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }

        alert('ユーザー情報を変更しました');
    };

    return (
        <BlogFormLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={handleCreateBlog}
            handleLogout={handleLogout}
            handleLogin={() => {}}
        >
            <main className="flex-grow p-6">
                {/** 戻る */}
                <div className="mb-4">
                    <button
                        className="mb-4 text-blue-600 hover:underline"
                        onClick={() => window.history.back()}
                    >
                        &larr; 戻る
                    </button>
                </div>

                <div className="bg-white shadow-md rounded px-10 pt-8 pb-10 mb-6">
                    <h2 className="text-xl font-bold mb-6">ユーザー情報変更</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                名前:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                name="username"
                                placeholder="ユーザー名"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                メールアドレス:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="example@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="currentPassword"
                            >
                                現在のパスワード:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="currentPassword"
                                type="password"
                                name="currentPassword"
                                placeholder="現在のパスワード"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="newPassword"
                            >
                                新しいパスワード:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                placeholder="新しいパスワード"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="confirmPassword"
                            >
                                パスワードをもう一度入力:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="パスワードをもう一度入力"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-center space-x-6">
                            <button
                                type="submit"
                                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full shadow-2xl transition-transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-500"
                            >
                                変更を保存
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </BlogFormLayout>
    );
};

export default UserEditForm;
