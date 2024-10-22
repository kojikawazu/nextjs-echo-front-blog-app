'use server';

// cookies
import { cookies } from 'next/headers';
// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * トークンを取得
 * @returns トークン
 */
export const getCookieToken = () => {
    // クッキーを取得
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get(CommonConstants.TOKEN_NAME.TOKEN_NAME);
    console.log('[page]isTokenCookie:', tokenCookie !== undefined);

    return tokenCookie;
};
