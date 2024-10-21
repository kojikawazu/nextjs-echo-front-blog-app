'use server';

// cookies
import { cookies } from 'next/headers';
// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserEditFormType } from '@/app/types/users-type';

/**
 * ユーザー情報更新関数(サーバーサイド)
 * @param formData フォームデータ
 * @returns true or false
 * @throws Error
 */
export const updateUserServerAction = async (formData: UserEditFormType) => {
    console.log('updateUserServerAction: ');
    const fetchUrl = `${process.env.API_URL}/users/update`;

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token.value}` } : {}),
            },
            body: JSON.stringify(formData),
        });

        console.log('update user PUT response status: ', response.status);
        //console.log(`create blog POST response.headers: ${response.headers}`);

        if (response.ok) {
            // レスポンスのクッキー取得
            const newCookie = response.headers.get('set-cookie');
            //console.log(funcName, ' auth login POST newCookie: ', newCookie);

            if (newCookie) {
                // 'token=...' の部分を取り出す
                const tokenValue = newCookie
                    .split(';')
                    .find((cookie) => cookie.trim().startsWith('token='));

                if (tokenValue) {
                    // 'token=hogehoge' をデコードして 'token' の値だけを取り出す
                    const token = decodeURIComponent(tokenValue.split('=')[1]);
                    //console.log(funcName, ' auth login POST decoded token: ', token);

                    // クッキーを更新
                    const cookieStore = cookies();
                    cookieStore.set('token', token);
                    //console.log(funcName, ' auth login POST Set-Cookie updated with token');
                }
            }

            return true;
        } else {
            console.log('update user PUT response error status: ', response.status);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to update user. ' + error);
    }
};
