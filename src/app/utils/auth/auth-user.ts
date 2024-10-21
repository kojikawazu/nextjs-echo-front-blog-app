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
