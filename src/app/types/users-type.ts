/**
 * @description: Type for the user
 */
export interface UserLoginFormType {
    username: string;
    password: string;
}

/**
 * @description: Type for the user
 */
export interface UserAuthType {
    user_id: string;
    username: string;
    email: string;
}

/**
 * @description: Type for the user
 */
export interface UserEditFormType {
    name: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}
