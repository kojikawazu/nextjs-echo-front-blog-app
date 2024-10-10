/**
 * メールアドレスの形式を検証する関数
 * @param email 検証するメールアドレス
 * @returns メールアドレスが有効な形式であれば true、そうでなければ false
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
