// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * ユーザー情報を取得する
 * @returns ユーザーデータ or null
 * @throws Error
 */
export const fetchUser = async () => {
    try {
        const responseDetail = await fetch(`/api/users/detail`);

        console.log('fetch user GET response status: ', responseDetail.status);

        if (responseDetail.ok) {
            const responseData = await responseDetail.json();
            return responseData;
        } else {
            console.error('Failed to fetch user response status: ', responseDetail.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch user. ' + error);
    }
};
