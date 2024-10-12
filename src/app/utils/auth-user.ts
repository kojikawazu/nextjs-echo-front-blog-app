'use server';

import { cookies } from 'next/headers';

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
        console.log('fetchAuthUser response:', response);

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
