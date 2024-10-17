'use server';

import { cookies } from 'next/headers';

/**
 * トークンを取得
 * @returns トークン
 */
export const getCookieToken = () => {
    // クッキーを取得
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    console.log('[page]isTokenCookie:', tokenCookie !== undefined);

    return tokenCookie;
};

/**
 *　認証ユーザー情報を取得
 * @returns 認証ユーザーデータ or null
 */
export const fetchAuthUser = async () => {
    console.log('fetchAuthUser start...');
    const fetchUrl = `${process.env.API_URL}/users/auth-check`;

    // クッキーを取得
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    console.log('isTokenCookie:', tokenCookie !== undefined);

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                Cookie: tokenCookie ? `token=${tokenCookie.value}` : '',
            },
        });
        console.log('fetchAuthUser GET response.status:', response.status);

        if (response.ok) {
            console.log('fetchAuthUser response.ok');
            const data = await response.json();
            console.log('fetchAuthUser data:', data);
            return data;
        } else {
            console.error('fetchAuthUser response.error');
            return null;
        }
    } catch (error) {
        console.error('fetchAuthUser error:', error);
        return null;
    }
};
