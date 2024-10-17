/**
 * @description: Type for the raw comment (from API)
 */
export type RawCommentType = {
    id: string;
    blog_id: string;
    guest_user: string;
    comment: string;
    created_at: string;
};

/**
 * @description: Comment type
 */
export type CommentFormType = {
    guestUser: string;
    comment: string;
};
