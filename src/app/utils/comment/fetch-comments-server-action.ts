'use server';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// types
import { CommentFormType, RawCommentType } from '@/app/types/comment-types';

/**
 * コメントの追加
 * @param formData フォームデータ
 * @param blogId ブログID
 * @returns コメントデータ or null
 * @throws Error
 */
export const createCommentServerAction = async (commentData: CommentFormType, blogId: string) => {
    console.log('createCommentServerAction: ');
    const funcName = '[createCommentServerAction]';
    const fetchUrl = `${process.env.API_URL}/comments/create`;

    try {
        // Backend API 送信
        const response = await fetch(`${fetchUrl}`, {
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

        console.log(funcName, ' create comment POST response status: ', response.status);
        //console.log(`create comment POST response.headers: ${response.headers}`);

        if (response.ok) {
            const responseBody = await response.text();
            const newComment: RawCommentType = JSON.parse(responseBody);
            //console.log('create comment POST response body: ', commentsData);
            return newComment;
        } else {
            console.log(funcName, ' create comment POST response error status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
        throw new Error('Failed to create comment. ' + error);
    }
};
