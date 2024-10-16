import { toast } from 'react-toastify';
import { UserEditFormType } from '@/app/types/users-type';

/**
 * ユーザー情報を取得する
 * @returns ユーザーデータ or null
 * @throws Error
 */
export const fetchUser = async () => {
    try {
        const responseDetail = await fetch(`/api/users/detail`);

        if (responseDetail.ok) {
            const responseData = await responseDetail.json();
            return responseData;
        } else {
            console.error('Failed to fetch user');
            return null;
        }
    } catch (error) {
        console.error('Server error:', error);
        throw new Error('Failed to fetch user');
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

        console.log('update user PUT response status:', response.status);
        //console.log(`response.headers: ${response.headers}`);

        if (response.ok) {
            toast.success('ユーザーを更新しました。');
            return true;
        } else {
            console.log('response error status:', response.status);
            toast.error('ユーザーの更新に失敗しました。');
            return false;
        }
    } catch (error) {
        console.error('Server error:', error);
        toast.error('ユーザーの更新に失敗しました。');
        throw new Error('Failed to update user');
    }
};
