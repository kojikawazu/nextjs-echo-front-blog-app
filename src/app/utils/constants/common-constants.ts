/**
 * Common Constants
 */
export const CommonConstants = {
    // toast messages
    TOAST_MESSAGE: {
        ADD_COMMENT_INVALID_REQUIRED: '名前とコメントは必須です。',
        ADD_COMMENT_SUCCESSED: 'コメントを追加しました。',
    },
    // confirm messages
    CONFIRM_MESSAGE: {
        BLOG_ADD: 'ブログを追加してもよろしいですか？',
        BLOG_DELETE: 'ブログを削除してもよろしいですか？',

        ADD_COMMENT: 'コメントを追加してもよろしいですか？',
    },
    // URL path
    URL_PATH: {
        BLOG_HOME: '/blog',
    },
    // API error message
    ERROR_MESSAGE: {
        API_ROUTER_ERROR: 'API Error',

        DEL_BLOG_FAILURE: 'ブログの削除に失敗しました。',

        ADD_COMMENT_FAILURE: 'コメントの追加に失敗しました。',

        BLOG_LIKE_FAILURE: 'いいねの登録/失敗に失敗しました。',
    },
    BLOG_LIST: {
        // 1ページあたりの表示数
        ITEMS_PER_PAGE: 4,
    },
};
