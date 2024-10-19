// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { CommentFormType, RawCommentType } from '@/app/types/comment-types';

/**
 * ブログIDからコメントを取得
 * @param blogId
 * @returns コメントデータリスト or null
 * @throws Error
 */
export const fetchCommentsByBlogId = async (blogId: string) => {
    try {
        const response = await fetch(`/api/comments/blog/${blogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('fetch comments by blogId GET response.status:', response.status);

        if (response.ok) {
            const commentsData: RawCommentType[] = await response.json();
            //console.log('Comments data:', commentsData);
            return commentsData;
        } else {
            console.error('Failed to fetch comments by blogId response.status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to fetch comments.' + error);
    }
};

/**
 * コメントの追加
 * @param commentData
 * @param blogId
 * @returns コメントデータ or null
 * @throws Error
 */
export const createComment = async (commentData: CommentFormType, blogId: string) => {
    if (blogId === '') {
        console.error('Invalid blogId: ', blogId);
        return null;
    }

    try {
        const response = await fetch('/api/comments/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogId: blogId,
                guestUser: commentData.guestUser,
                comment: commentData.comment,
            }),
        });

        console.log('create comment POST response.status: ', response.status);

        if (response.ok) {
            const newComment: RawCommentType = await response.json();
            //console.log('New comment:', newComment);
            return newComment;
        } else {
            console.error('Failed to create comment response.status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to create comment. ' + error);
    }
};
