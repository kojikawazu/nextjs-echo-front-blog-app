import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * ユーザー編集フォームを表示する
 * @param router
 */
export const handleUserEditForm = (router: AppRouterInstance) => {
    router.push(`/user/edit`);
};
