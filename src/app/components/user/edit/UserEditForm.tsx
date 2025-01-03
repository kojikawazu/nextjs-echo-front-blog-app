'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType, UserEditFormType } from '@/app/types/users-type';
// utils
import { fetchUser } from '@/app/utils/user/fetch-user';
import { handleCreateBlogForm } from '@/app/utils/blog/handle-blog';
import { handleFormChange } from '@/app/utils/form/handle-form';
import { isValidEmail } from '@/app/utils/validate/validate';
import { updateUserServerAction } from '@/app/utils/user/fetch-user-server-action';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
import { useUserEditForm } from '@/app/hooks/user/useUserEditForm';
// components
import LoadingComponent from '@/app/components/common/LoadingComponent';
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';

interface UserEditFormProps {
    inAuthUser: UserAuthType;
}

/**
 * ユーザー編集フォーム
 * @param inAuthUser
 * @returns JSX
 */
const UserEditForm = ({ inAuthUser }: UserEditFormProps) => {
    // Router(カスタムフック)
    const router = useRouter();
    // ユーザー情報取得中(カスタムフック)
    const { isLoadingUserData, formData, setIsLoadingUserData, setFormData } = useUserEditForm();
    // ユーザー情報(カスタムフック)
    const { isLoading, isLoggedIn, authUser, handleLogout } = useUser({
        inAuthUser,
    });

    // ユーザーデータ取得
    useEffect(() => {
        const localFetch = async () => {
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
                } else {
                    console.error('Failed to fetch user');
                    router.push(CommonConstants.URL_PATH.BLOG_HOME);
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
                router.push(CommonConstants.URL_PATH.BLOG_HOME);
            } finally {
                setIsLoadingUserData(false);
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetch();
        }
    }, [isLoading, isLoggedIn, router, setFormData, setIsLoadingUserData]);

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // バリデーション
        if (formData.name == '') {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_USERNAME);
            return;
        }

        if (formData.email == '') {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_EMAIL);
            return;
        }

        if (formData.password == '') {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_CURRENT_PASSWORD);
            return;
        }

        if (formData.newPassword == '') {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_NEW_PASSWORD);
            return;
        }

        if (formData.confirmPassword == '') {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_CONFIRM_PASSWORD);
            return;
        }

        // Eメール形式チェック
        if (!isValidEmail(formData.email)) {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_EMAIL_FORMAT);
            return;
        }

        // パスワード一致チェック
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_INVALID_PASSWORD_NOT_MATCH);
            return;
        }

        if (confirm(CommonConstants.CONFIRM_MESSAGE.USER_UPDATE)) {
            try {
                // ユーザー情報更新
                const ret = await updateUserServerAction(formData);
                if (ret) {
                    toast.success(CommonConstants.TOAST_MESSAGE.UPDATE_USER_SUCCESSED);
                    router.push(CommonConstants.URL_PATH.BLOG_HOME);
                } else {
                    toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_FAILURE);
                }
            } catch (error) {
                toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_FAILURE);
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
            handleLogin={() => {}}
        >
            {isLoading && isLoadingUserData ? (
                <div className="flex-grow p-4 flex items-center justify-center">
                    <LoadingComponent />
                </div>
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
                        {isLoadingUserData ? (
                            <div className="flex-grow p-4 flex items-center justify-center">
                                <LoadingComponent />
                            </div>
                        ) : (
                            <>
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
                                                handleFormChange<UserEditFormType>(
                                                    e,
                                                    formData,
                                                    setFormData,
                                                )
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
                                                handleFormChange<UserEditFormType>(
                                                    e,
                                                    formData,
                                                    setFormData,
                                                )
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
                                                handleFormChange<UserEditFormType>(
                                                    e,
                                                    formData,
                                                    setFormData,
                                                )
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
                                                handleFormChange<UserEditFormType>(
                                                    e,
                                                    formData,
                                                    setFormData,
                                                )
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
                                                handleFormChange<UserEditFormType>(
                                                    e,
                                                    formData,
                                                    setFormData,
                                                )
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
                            </>
                        )}
                    </div>
                </main>
            )}
        </BlogFormLayout>
    );
};

export default UserEditForm;
