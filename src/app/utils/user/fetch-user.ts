import { toast } from 'react-toastify';
// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { UserEditFormType } from '@/app/types/users-type';

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

/**
 * ユーザー更新関数
 * @param formData フォームデータ
 * @returns true or false
 * @throws Error
 */
export const updateUser = async (formData: UserEditFormType) => {
    try {
        // API 送信
        const response = await fetch(`/api/users/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('update user PUT response status: ', response.status);
        //console.log(`response.headers: ${response.headers}`);

        if (response.ok) {
            toast.success(CommonConstants.TOAST_MESSAGE.UPDATE_USER_SUCCESSED);
            return true;
        } else {
            console.log('response error status: ', response.status);
            toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_FAILURE);
            return false;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        toast.error(CommonConstants.TOAST_MESSAGE.UPDATE_USER_FAILURE);
        throw new Error('Failed to update user. ' + error);
    }
};
