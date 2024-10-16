'use client';

import React, { useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';
import { UserLoginFormType } from '@/app/types/users-type';
import { isValidEmail } from '@/app/utils/validate/validate';

/**
 * ユーザーログインフォームコンポーネント
 * @returns JSX
 */
const UserLoginForm = () => {
    // エラーメッセージ
    const [errorMessage, setErrorMessage] = useState('');
    // ローディング
    const [isLoading, setIsLoading] = useState(false);
    // フォームデータ
    const [formData, setFormData] = useState<UserLoginFormType>({
        username: '',
        password: '',
    });
    // ユーザーログインフック
    const {
        isLoading: isUserLoading,
        isLoggedIn,
        isLoginError,
        authUser,
        handleLoginForm,
        handleLogin,
    } = useUser();

    // フォームの変更
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ユーザーネームとパスワードが入力されているかチェック
        if (formData.username === '' || formData.password === '') {
            setErrorMessage('ユーザーネームとパスワードを入力してください');
            return;
        }
        // メールアドレスの形式チェック
        if (!isValidEmail(formData.username)) {
            setErrorMessage('正しいEメールアドレスを入力してください');
            return;
        }

        // ログイン処理
        setErrorMessage('');
        setIsLoading(true);

        try {
            await handleLogin(formData.username, formData.password);
        } catch (error) {
            console.error('ログイン中にエラーが発生しました:', error);
            setErrorMessage('ログイン中にエラーが発生しました。再度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BlogFormLayout
            isLoading={isUserLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => {}}
            handleLogout={() => {}}
            handleLogin={handleLoginForm}
        >
            <main className="flex-grow p-4 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    {isLoginError && (
                        <div className="flex justify-center">
                            <p className="text-red-500 text-sm italic mb-4">
                                {'ユーザーログインに失敗しました'}
                            </p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="flex justify-center">
                            <p className="text-red-500 text-sm italic mb-4">{errorMessage}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            ユーザー(Eメール)
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </div>
                </form>
            </main>
        </BlogFormLayout>
    );
};

export default UserLoginForm;
