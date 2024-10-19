/**
 * Common Constants
 */
export const CommonConstants = {
    // toast messages
    TOAST_MESSAGE: {
        ADD_COMMENT_INVALID_REQUIRED: '名前とコメントは必須です。',
        ADD_COMMENT_SUCCESSED: 'コメントを追加しました。',

        UPDATE_USER_INVALID_USERNAME: 'ユーザー名を入力してください。',
        UPDATE_USER_INVALID_EMAIL: 'メールアドレスを入力してください。',
        UPDATE_USER_INVALID_CURRENT_PASSWORD: '現在のパスワードを入力してください。',
        UPDATE_USER_INVALID_NEW_PASSWORD: '新しいパスワードを入力してください。',
        UPDATE_USER_INVALID_CONFIRM_PASSWORD: '確認用パスワードを入力してください。',
        UPDATE_USER_INVALID_EMAIL_FORMAT: 'メールアドレスの形式が正しくありません。',
        UPDATE_USER_INVALID_PASSWORD_NOT_MATCH:
            '新しいパスワードと確認用パスワードが一致しません。',
        UPDATE_USER_SUCCESSED: 'ユーザー情報を更新しました。',

        LOGIN_USER_INVALID_EMAIL_AND_PASSWORD: 'メールアドレスとパスワードを入力してください。',
        LOGIN_USER_INVALID_EMAIL_FORMAT: '正しいEメールアドレスを入力してください',
        LOGIN_USER_FAILURE: 'ログインに失敗しました。',
    },
    // confirm messages
    CONFIRM_MESSAGE: {
        BLOG_ADD: 'ブログを追加してもよろしいですか？',
        BLOG_UPDATE: 'ブログを更新してもよろしいですか？',
        BLOG_DELETE: 'ブログを削除してもよろしいですか？',

        USER_UPDATE: 'ユーザー情報を更新してもよろしいですか？',

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
    LOGIN_FORM: {
        LOGIN_BUTTON: 'ログイン',
        LOGIN_NOW: 'ログイン中...',
        LOGIN_ERROR_MESSAGE: 'ログインに失敗しました。',
    },
};
