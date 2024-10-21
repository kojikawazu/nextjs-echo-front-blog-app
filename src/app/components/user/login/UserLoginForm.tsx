'use client';

import React from 'react';
import { toast } from 'react-toastify';

// types
import { UserLoginFormType } from '@/app/types/users-type';
// utils
import { isValidEmail } from '@/app/utils/validate/validate';
import { handleFormChange } from '@/app/utils/form/handle-form';
// hooks
import { useUserS } from '@/app/hooks/user/useUserS';
import { useUserLoginForm } from '@/app/hooks/user/useUserLoginForm';
// components
import BlogFormLayout from '@/app/components/layout/BlogFormLayout';
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * ユーザーログインフォームコンポーネント
 * @returns JSX
 */
const UserLoginForm = () => {
    // ユーザーログインフォームフック
    const {
        errorMessage,
        isLoginLoading,
        formData,
        setErrorMessage,
        setIsLoginLoading,
        setFormData,
    } = useUserLoginForm();

    // ユーザーログインフック
    const {
        isLoading: isUserLoading,
        isLoggedIn,
        isLoginError,
        authUser,
        handleLoginForm,
        handleLogin,
    } = useUserS({ inputAuthUser: null });

    // フォームの送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ユーザーネームとパスワードが入力されているかチェック
        if (formData.username === '' || formData.password === '') {
            toast.error(CommonConstants.TOAST_MESSAGE.LOGIN_USER_INVALID_EMAIL_AND_PASSWORD);
            return;
        }
        // メールアドレスの形式チェック
        if (!isValidEmail(formData.username)) {
            toast.error(CommonConstants.TOAST_MESSAGE.LOGIN_USER_INVALID_EMAIL_FORMAT);
            return;
        }

        // ログイン処理
        setErrorMessage('');
        setIsLoginLoading(true);

        try {
            await handleLogin(formData.username, formData.password);
        } catch (error) {
            console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            toast.error(CommonConstants.TOAST_MESSAGE.LOGIN_USER_FAILURE);
        } finally {
            setIsLoginLoading(false);
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
                                {CommonConstants.LOGIN_FORM.LOGIN_ERROR_MESSAGE}
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
                            onChange={(e) =>
                                handleFormChange<UserLoginFormType>(e, formData, setFormData)
                            }
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
                            onChange={(e) =>
                                handleFormChange<UserLoginFormType>(e, formData, setFormData)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={isLoginLoading}
                        >
                            {isLoginLoading
                                ? CommonConstants.LOGIN_FORM.LOGIN_NOW
                                : CommonConstants.LOGIN_FORM.LOGIN_BUTTON}
                        </button>
                    </div>
                </form>
            </main>
        </BlogFormLayout>
    );
};

export default UserLoginForm;
