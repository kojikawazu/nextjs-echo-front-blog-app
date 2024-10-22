import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';

/**
 * ユーザー編集フォームを表示する
 * @param router
 */
export const handleUserEditForm = (router: AppRouterInstance) => {
    router.push(CommonConstants.URL_PATH.USER_EDIT);
};
