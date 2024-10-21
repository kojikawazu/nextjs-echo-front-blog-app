'use server';

// cookies
import { cookies } from 'next/headers';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserAuthType } from '@/app/types/users-type';

/**
 * 認証ユーザーの取得
 * @returns 認証ユーザー情報 | null
 * @throws エラー
 */
export const fetchAuthUserServerAction = async () => {
    console.log('fetchAuthUserServerAction: ');
    const funcName = '[fetchAuthUserServerAction]';
    const fetchUrl = `${process.env.API_URL}/users/auth-check`;

    // クッキーの取得
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    //console.log('create blog POST token: ', token);

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token.value}` } : {}),
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
