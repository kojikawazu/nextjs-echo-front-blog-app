import { useState } from 'react';
// types
import { CommentFormType } from '@/app/types/comment-types';

/**
 * コメントフォームのカスタムフック
 * @returns カスタムフック
 */
export const useCommentForm = () => {
    // コメントフォーム
    const [commentForm, setCommentForm] = useState<CommentFormType>({
        guestUser: '',
        comment: '',
    });
    // コメントリスト
    const [comments, setComments] = useState<CommentFormType[]>([]);

    /**
     * バリデーション
     * @returns true OK false NG
     */
    const validation = () => {
        return !!commentForm.guestUser || !commentForm.comment;
    };

    /**
     * コメント追加
     */
    const addCommentData = () => {
        if (commentForm) {
            setComments([...comments, commentForm]);
            setCommentForm({ guestUser: '', comment: '' });
        }
    };

    return {
        commentForm,
        setCommentForm,
        comments,
        setComments,
        validation,
        addCommentData,
    };
};
