'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { format } from 'date-fns';

// types
import { BlogType } from '@/app/types/blogs-types';
import { CommentFormType } from '@/app/types/comment-types';
// utils
import { handleCreateBlogForm, handleEditBlogForm } from '@/app/utils/blog/handle-blog';
import { deleteBlog, fetchBlogById } from '@/app/utils/blog/fetch-blog';
import {
    conversionFRawCommentListTCommentList,
    conversionFromRawBlogTypeToBlogType,
} from '@/app/utils/conversion/conversion';
import { handleFormChange, handleTextareaFormChange } from '@/app/utils/form/handle-form';
import { createComment, fetchCommentsByBlogId } from '@/app/utils/comment/fetch-comment';
import { fetchMarkdown } from '@/app/utils/github/fetch-github';
// hooks
import { useUser } from '@/app/hooks/user/useUser';
import { useCommentForm } from '@/app/hooks/comment/useCommentForm';
// components
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';
// css
import 'highlight.js/styles/github.css';
import '@/app/styles/markdown.css';
import { toast } from 'react-toastify';

interface BlogDetailProps {
    blogId: string;
}

/**
 * ブログ詳細コンポーネント
 * @param blogId
 * @returns JSX
 */
const BlogDetail = ({ blogId }: BlogDetailProps) => {
    // Router(カスタムフック)
    const router = useRouter();
    // 選択カテゴリー
    const [selectedCategory, setSelectedCategory] = useState('全て');
    // カテゴリー
    const categories = ['全て', 'フロントエンド', 'バックエンド', 'DevOps', 'AI/機械学習'];
    // ブログ
    const [blog, setBlog] = useState<BlogType>();
    // markdown用
    const [markdownContent, setMarkdownContent] = useState('');
    // ブログメタ情報
    const [blogMeta] = useState<{ title: string; topics: string[] }>({
        title: '',
        topics: [],
    });

    // コメントカスタムフック
    const { commentForm, setCommentForm, comments, setComments, addCommentData, validation } =
        useCommentForm();
    // ユーザー情報カスタムフック
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();

    useEffect(() => {
        const localFetch = async () => {
            let githubUrls = '';

            /**
             * ブログデータ取得
             */
            try {
                const responseBlogData = await fetchBlogById(blogId);
                if (responseBlogData) {
                    // RawBlogType から BlogType に変換
                    const changedBlogs: BlogType =
                        conversionFromRawBlogTypeToBlogType(responseBlogData);
                    setBlog(changedBlogs);
                    githubUrls = changedBlogs.githubUrl;
                } else {
                    return;
                }
            } catch (error) {
                console.error('Server error:', error);
                return;
            }

            /**
             * GitHubからMarkdownを取得
             */
            try {
                const resGitHubContent = await fetchMarkdown(githubUrls);
                if (resGitHubContent) {
                    setMarkdownContent(resGitHubContent);
                } else {
                    return;
                }
            } catch (error) {
                console.error('API Error:', error);
                return;
            }

            /**
             * コメントデータリストの取得
             */
            try {
                const rawCommentsData = await fetchCommentsByBlogId(blogId);
                if (rawCommentsData) {
                    const commentsData: CommentFormType[] =
                        conversionFRawCommentListTCommentList(rawCommentsData);
                    setComments(commentsData);
                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetch();
        }
    }, [isLoading, isLoggedIn, blogId, setComments]);

    /**
     * ブログ削除ハンドル
     * @param localBlogId
     */
    const handleDeleteBlog = async (localBlogId: string) => {
        if (confirm('本当に削除しますか？')) {
            try {
                const ret = await deleteBlog(localBlogId);
                if (ret) {
                    router.push('/blog');
                }
            } catch (error) {
                console.error('Failed to delete blog:', error);
            }
        }
    };

    /**
     * コメントの追加ハンドル
     * @param localBlogId
     * @returns void
     */
    const handleAddComment = async (localBlogId: string) => {
        if (confirm('コメントを追加しますか？')) {
            // バリデーション
            if (!validation()) {
                toast.error('名前とコメントは必須です');
                return;
            }

            try {
                const response = await createComment(commentForm, localBlogId);
                if (response) {
                    toast.success('コメントを追加しました');
                    addCommentData();
                }
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    return (
        <BlogMainLayout
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            loginUser={authUser ? authUser.username : null}
            handleCreateBlog={() => handleCreateBlogForm(router)}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        >
            {isLoading ? (
                <div className="flex-grow p-4 flex items-center justify-center">Loading...</div>
            ) : blog == undefined ? (
                <div className="flex-grow p-4 flex items-center justify-center">No blog found</div>
            ) : (
                <main className="flex-grow p-4">
                    {/** 戻る */}
                    <div className="mb-4">
                        <button
                            className="mb-4 text-blue-600 hover:underline"
                            onClick={() => window.history.back()}
                        >
                            &larr; 戻る
                        </button>
                    </div>

                    {/** ブログ詳細 */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                        <p className="text-sm text-gray-600">
                            トピック: {blogMeta.topics.join(', ')}
                        </p>

                        <div className="flex space-x-4 mb-2">
                            <p className="text-sm text-gray-600">カテゴリー: {blog.category}</p>
                            <p className="text-sm text-gray-600">タグ: {blog.tags.join(', ')}</p>
                        </div>

                        <div className="flex space-x-4 mb-4">
                            <p className="text-sm text-gray-600">
                                作成日: {format(new Date(blog.createdAt), 'yyyy/MM/dd HH:mm')}
                            </p>
                            <p className="text-sm text-gray-600">
                                更新日: {format(new Date(blog.updatedAt), 'yyyy/MM/dd HH:mm')}
                            </p>
                        </div>

                        <div className="mb-4 border-t border-b border-gray-200 py-4">
                            <h3 className="text-lg font-semibold mb-2">概要</h3>
                            <p className="mb-4">{blog.description}</p>
                            <div className="markdown-content">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="flex justify-end items-center space-x-2 mb-4">
                            <button
                                onClick={() => alert('いいねが追加されました！')}
                                className="text-[#4a90e2] hover:text-[#3b7ac7] font-bold py-2 px-4 focus:outline-none focus:shadow-outline ml-2"
                            >
                                ❤️ 0
                            </button>
                            <button
                                onClick={() => handleEditBlogForm(router, blog.id)}
                                className="bg-[#4a90e2] hover:bg-[#3b7ac7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                編集する
                            </button>
                            <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="bg-[#4a90e2] hover:bg-[#3b7ac7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                削除する
                            </button>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">ユーザー</h3>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="guestUser"
                                type="text"
                                name="guestUser"
                                value={commentForm.guestUser}
                                onChange={(e) =>
                                    handleFormChange<CommentFormType>(
                                        e,
                                        commentForm,
                                        setCommentForm,
                                    )
                                }
                                required
                            />

                            <h3 className="text-lg font-semibold mb-2">コメント</h3>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                id="comment"
                                value={commentForm?.comment}
                                name="comment"
                                onChange={(e) =>
                                    handleTextareaFormChange<CommentFormType>(
                                        e,
                                        commentForm,
                                        setCommentForm,
                                    )
                                }
                                placeholder="コメントを書く..."
                            />

                            <button
                                onClick={() => handleAddComment(blog.id)}
                                className="bg-[#4a90e2] hover:bg-[#3b7ac7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                            >
                                コメントを追加
                            </button>

                            <ul className="mb-4">
                                {comments.map((comment, index) => (
                                    <li key={index} className="p-2 border-b border-gray-200">
                                        <strong>{comment.guestUser}</strong> : {comment.comment}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            )}
        </BlogMainLayout>
    );
};

export default BlogDetail;
