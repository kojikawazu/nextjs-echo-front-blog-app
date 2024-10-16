'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { UserEditFormType } from '@/app/types/users-type';
import { fetchUser, updateUser } from '@/app/utils/user/fetch-user';
import { handleCreateBlogForm } from '@/app/utils/blog/handle-blog';
import { handleFormChange } from '@/app/utils/form/handle-form';
import { isValidEmail } from '@/app/utils/validate/validate';
import { useUser } from '@/app/hooks/user/useUser';
import { useUserEditForm } from '@/app/hooks/user/useUserEditForm';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

/**
 * ユーザー編集フォーム
 * @returns JSX
 */
const UserEditForm = () => {
    // Router(カスタムフック)
    const router = useRouter();
    // ユーザー情報取得中(カスタムフック)
    const { isLoadingUserData, formData, setIsLoadingUserData, setFormData } = useUserEditForm();
    // ユーザー情報
    const { isLoading, isLoggedIn, authUser, handleLogout } = useUser();

    // ユーザーデータ取得
    useEffect(() => {
        const localFetchUserById = async () => {
            try {
                const responseData = await fetchUser();
                if (responseData) {
                    setFormData({
                        name: responseData.name,
                        email: responseData.email,
                        password: '',
                        newPassword: '',
                        confirmPassword: '',
                    });
                    setIsLoadingUserData(false);
                } else {
                    console.error('Failed to fetch user');
                    router.push('/blog');
                }
            } catch (error) {
                console.error('Server error:', error);
                router.push('/blog');
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetchUserById();
        }
    }, [isLoading, isLoggedIn, router, setFormData, setIsLoadingUserData]);

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // バリデーション
        if (formData.name == '') {
            toast.error('ユーザーネームを入力してください');
            return;
        }

        if (formData.email == '') {
            toast.error('メールアドレスを入力してください');
            return;
        }

        if (formData.password == '') {
            toast.error('現在のパスワードを入力してください');
            return;
        }

        if (formData.newPassword == '') {
            toast.error('新しいパスワードを入力してください');
            return;
        }

        if (formData.confirmPassword == '') {
            toast.error('パスワードをもう一度入力してください');
            return;
        }

        // Eメール形式チェック
        if (!isValidEmail(formData.email)) {
            toast.error('メールアドレスの形式が正しくありません');
            return;
        }

        // パスワード一致チェック
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('新しいパスワードが一致しません');
            return;
        }

        if (confirm('本当に変更してよろしいですか？')) {
            try {
                // ユーザー情報更新
                const ret = await updateUser(formData);
                if (ret) {
                    router.push('/blog');
                }
            } catch (error) {
                console.error('Failed to update user: ', error);
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
            handleLogin={() => {}}
        >
            {isLoading && isLoadingUserData ? (
                <div className="flex-grow p-4 flex items-center justify-center">Loading...</div>
            ) : (
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

                    {/** ユーザー情報変更フォーム */}
                    <div className="bg-white shadow-md rounded px-10 pt-8 pb-10 mb-6">
                        <h2 className="text-xl font-bold mb-6">ユーザー情報変更</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    名前:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="ユーザー名"
                                    value={formData.name}
                                    onChange={(e) =>
                                        handleFormChange<UserEditFormType>(e, formData, setFormData)
                                    }
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
                                    onChange={(e) =>
                                        handleFormChange<UserEditFormType>(e, formData, setFormData)
                                    }
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
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="現在のパスワード"
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleFormChange<UserEditFormType>(e, formData, setFormData)
                                    }
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
                                    onChange={(e) =>
                                        handleFormChange<UserEditFormType>(e, formData, setFormData)
                                    }
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
                                    onChange={(e) =>
                                        handleFormChange<UserEditFormType>(e, formData, setFormData)
                                    }
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
            )}
        </BlogFormLayout>
    );
};

export default UserEditForm;
