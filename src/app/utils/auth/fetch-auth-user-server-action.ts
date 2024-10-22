'use server';

// cookies
import { cookies } from 'next/headers';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';
// utils
import { isValidEmail } from '@/app/utils/validate/validate';

/**
 * 認証ユーザーの取得
 * @returns 認証ユーザー情報 | null
 * @throws エラー
 */
export const fetchAuthUserServerAction = async () => {
    console.log('fetchAuthUserServerAction: ');
    const funcName = '[fetchAuthUserServerAction]';
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.AUTH_CHECK}`;

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get(CommonConstants.TOKEN_NAME.TOKEN_NAME);
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token
                    ? { Cookie: `${CommonConstants.TOKEN_NAME.TOKEN_NAME}=${token.value}` }
                    : {}),
            },
        });

        console.log(funcName, ' fetch auth user GET response status: ', response.status);
        //console.log(`fetch auth user GET response.headers: ${response.headers}`);

        if (response.ok) {
            console.log(funcName, ' fetch auth user GET response.ok');
            const responseBody = await response.text();
            const responseData = JSON.parse(responseBody);
            //console.log(funcName, ' fetch auth user GET responseData: ', responseData);

            const authUser: UserAuthType = {
                user_id: responseData.user_id,
                username: responseData.username,
                email: responseData.email,
            };
            //console.log(funcName, ' fetch auth user GET authUser: ', authUser);

            return authUser;
        } else {
            console.log(funcName, ' fetch auth user GET response error status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(funcName, ` ${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch auth user. ' + error);
    }
};

/**
 * ログイン処理
 * @param email
 * @param password
 * @returns true or false
 * @throws エラー
 */
export const loginServerAction = async (email: string, password: string) => {
    console.log('loginServerAction: ');
    const funcName = '[loginServerAction]';
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.AUTH_LOGIN}`;

    // メールアドレスとパスワードのチェック
    if (!email || !password) {
        console.error(funcName, ' email or password is empty.');
        return false;
    }
    // メールアドレスの形式チェック
    if (!isValidEmail(email)) {
        console.error(funcName, ' email is invalid.');
        return false;
    }

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(funcName, ' auth login POST response status: ', response.status);
        //console.log(funcName, `auth login POST response.headers: ${response.headers}`);

        if (response.ok) {
            console.log(funcName, ' auth login POST response.ok');

            // レスポンスのクッキー取得
            const newCookie = response.headers.get('set-cookie');
            //console.log(funcName, ' auth login POST newCookie: ', newCookie);

            if (newCookie) {
                // 'token=...' の部分を取り出す
                const tokenValue = newCookie
                    .split(';')
                    .find((cookie) =>
                        cookie.trim().startsWith(`${CommonConstants.TOKEN_NAME.TOKEN_NAME}=`),
                    );

                if (tokenValue) {
                    // 'token=hogehoge' をデコードして 'token' の値だけを取り出す
                    const token = decodeURIComponent(tokenValue.split('=')[1]);
                    //console.log(funcName, ' auth login POST decoded token: ', token);

                    // クッキーを更新
                    const cookieStore = cookies();
                    cookieStore.set(CommonConstants.TOKEN_NAME.TOKEN_NAME, token);
                    //console.log(funcName, ' auth login POST Set-Cookie updated with token');
                }
            }

            return true;
        } else {
            console.log(funcName, ' auth login POST response error status: ', response.status);
            return false;
        }
    } catch (error) {
        console.error(funcName, ` ${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to auth login. ' + error);
    }
};

/**
 * ログアウト処理
 * @returns true or false
 * @throws エラー
 */
export const logoutServerAction = async () => {
    console.log('logoutServerAction: ');
    const funcName = '[logoutServerAction]';
    const fetchUrl = `${process.env.API_URL}${CommonConstants.BACKEND_API.AUTH_LOGOUT}`;

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get(CommonConstants.TOKEN_NAME.TOKEN_NAME);
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token
                    ? { Cookie: `${CommonConstants.TOKEN_NAME.TOKEN_NAME}=${token.value}` }
                    : {}),
            },
        });

        console.log(funcName, ' auth logout POST response status: ', response.status);
        //console.log(funcName, `auth logout POST response.headers: ${response.headers}`);

        if (response.ok) {
            console.log(funcName, ' auth logout POST response.ok');

            // レスポンスのクッキー取得
            const newCookie = response.headers.get('set-cookie');
            //console.log('auth logout POST newCookie: ', newCookie);

            if (newCookie) {
                // クッキーを削除
                const cookieStore = cookies();
                cookieStore.delete(CommonConstants.TOKEN_NAME.TOKEN_NAME);
            }

            return true;
        } else {
            console.log(funcName, ' auth logout POST response error status: ', response.status);
            return false;
        }
    } catch (error) {
        console.error(funcName, ` ${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to auth login. ' + error);
    }
};
