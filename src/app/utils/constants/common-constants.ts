/**
 * Common Constants
 */
export const CommonConstants = {
    HEADER: {
        TITLE: 'Tech Blog',
    },
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
        UPDATE_USER_FAILURE: 'ユーザー情報の更新に失敗しました。',

        LOGIN_USER_INVALID_EMAIL_AND_PASSWORD: 'メールアドレスとパスワードを入力してください。',
        LOGIN_USER_INVALID_EMAIL_FORMAT: '正しいEメールアドレスを入力してください',
        LOGIN_USER_FAILURE: 'ログインに失敗しました。',

        ADD_BLOG_SUCCESSED: 'ブログを追加しました。',
        ADD_BLOG_FAILURE: 'ブログの追加に失敗しました。',

        UPDATE_BLOG_SUCCESSED: 'ブログを更新しました。',
        UPDATE_BLOG_FAILURE: 'ブログの更新に失敗しました。',

        DELETE_BLOG_SUCCESSED: 'ブログを削除しました。',
        DELETE_BLOG_FAILURE: 'ブログの削除に失敗しました。',
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
        BLOG_HOME: '/',
        USER_LOGIN: '/user/login',

        USER_EDIT: '/user/edit',
    },
    BACKEND_API: {
        AUTH_CHECK: '/users/auth-check',
        AUTH_LOGIN: '/users/login',
        AUTH_LOGOUT: '/users/logout',

        USER_DETAIL: '/users/detail',
        USER_UPDATE: '/users/update',

        BLOGS: '/blogs',
        BLOG_CREATE: '/blogs/create',
        BLOG_UPDATE: '/blogs/update',
        BLOG_DELETE: '/blogs/delete',
        BLOG_DETAIL: '/blogs/detail',
        BLOG_CATEGORIES: '/blogs/categories',

        BLOG_LIKES: '/blog-likes',
        GENERATE_VISIT_ID: '/blog-likes/generate-visit-id',
        IS_LIKED: '/blog-likes/is-liked',
        BLOG_LIKE_CREATE: '/blog-likes/create',
        BLOG_LIKE_DELETE: '/blog-likes/delete',

        CREATE_COMMENT: '/comments/create',
        COMMENT_BLOG: '/comments/blog',
    },
    // Token name
    TOKEN_NAME: {
        TOKEN_NAME: 'token',
        VISIT_ID_TOKEN: 'visit-id-token',
    },
    // API error message
    ERROR_MESSAGE: {
        API_ROUTER_ERROR: 'API Error',

        DEL_BLOG_FAILURE: 'ブログの削除に失敗しました。',

        ADD_COMMENT_FAILURE: 'コメントの追加に失敗しました。',

        BLOG_LIKE_FAILURE: 'いいねの登録/失敗に失敗しました。',
    },
    BLOG_LIST: {
        // query param
        QUERY_PARAM_CATEGORY: 'category',

        // カテゴリー
        CATEGORY_ALL: '全て',

        // 1ページあたりの表示数
        ITEMS_PER_PAGE: 4,
    },
    LOGIN_FORM: {
        LOGIN_BUTTON: 'ログイン',
        LOGIN_NOW: 'ログイン中...',
        LOGIN_ERROR_MESSAGE: 'ログインに失敗しました。',
    },
};
