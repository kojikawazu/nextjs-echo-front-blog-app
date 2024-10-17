import { BlogType, RawBlogType } from '@/app/types/blogs-types';
import { CommentFormType, RawCommentType } from '@/app/types/comment-types';

/**
 * RawBlogType → BlogType に変換する
 * @param rawBlog RawBlogType
 * @returns 変換後の BlogType
 */
export const conversionFromRawBlogTypeToBlogType = (rawBlog: RawBlogType): BlogType => {
    return {
        id: rawBlog.id,
        userId: rawBlog.user_id,
        title: rawBlog.title,
        description: rawBlog.description,
        githubUrl: rawBlog.github_url,
        category: rawBlog.category,
        tags: rawBlog.tags.split(','),
        likes: rawBlog.likes,
        createdAt: new Date(rawBlog.created_at),
        updatedAt: new Date(rawBlog.updated_at),
    };
};

/**
 * RawCommentType → CommentFormType に変換する
 * @param rawCommentsData RawCommentType[]
 * @returns 変換後の CommentFormType[]
 */
export const conversionFRawCommentListTCommentList = (
    rawCommentsData: RawCommentType[],
): CommentFormType[] => {
    return rawCommentsData.map((rawCommentData) => {
        return {
            guestUser: rawCommentData.guest_user,
            comment: rawCommentData.comment,
        };
    });
};
