'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import matter from 'gray-matter';
import { format } from 'date-fns';

import { useUser } from '@/app/hooks/user/useUser';
import { BlogType } from '@/app/types/blogs-types';
import { handleCreateBlogForm, handleEditBlogForm } from '@/app/utils/blog/handle-blog';
import { deleteBlog, fetchBlogById } from '@/app/utils/blog/fetch-blog';
import { conversionFromRawBlogTypeToBlogType } from '@/app/utils/conversion/conversion';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';

import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/monokai.css';
import '@/app/styles/markdown.css';

interface BlogDetailProps {
    blogId: string;
}

/**
 * ブログ詳細コンポーネント
 * @param blogId
 * @returns JSX
 */
const BlogDetail = ({ blogId }: BlogDetailProps) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('全て');
    const categories = ['全て', 'フロントエンド', 'バックエンド', 'DevOps', 'AI/機械学習'];
    const [comment, setComment] = useState('');
    const { isLoading, isLoggedIn, authUser, handleLoginForm, handleLogout } = useUser();
    const [blog, setBlog] = useState<BlogType>();
    const [markdownContent, setMarkdownContent] = useState('');
    const [blogMeta, setBlogMeta] = useState<{ title: string; topics: string[] }>({
        title: '',
        topics: [],
    });

    const [comments, setComments] = useState([
        { text: 'とても役に立ちました！', user: 'ユーザーA' },
        { text: 'もう少し詳しくお願いします。', user: 'ユーザーB' },
        { text: '素晴らしい記事です。', user: 'ユーザーC' },
    ]);

    useEffect(() => {
        // ブログデータの取得
        const localFetchBlogById = async () => {
            let githubUrls = '';

            try {
                const responseData = await fetchBlogById(blogId);

                if (responseData) {
                    // RawBlogType から BlogType に変換
                    const changedBlogs: BlogType =
                        conversionFromRawBlogTypeToBlogType(responseData);
                    setBlog(changedBlogs);
                    githubUrls = changedBlogs.githubUrl;
                } else {
                    console.error('Failed to fetch blog by id');
                    return;
                }
            } catch (error) {
                console.error('Server error:', error);
                return;
            }

            //console.log('GitHub URL:', githubUrls);

            const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/main\/(.+\.md)$/;
            const match = githubUrls.match(regex);
            const githubToken = process.env.GITHUB_TOKEN;
            if (!match) {
                console.error('Invalid GitHub Markdown URL format');
                return;
            }

            //console.log('GitHub URL match:', match);

            // GitHub API用のURLを構築
            const owner = match[1];
            const repo = match[2];
            const path = match[3];
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            const headers: HeadersInit = {
                Accept: 'application/vnd.github.v3.raw',
                ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
            };

            //console.log('GitHub API URL:', apiUrl);
            //console.log('GitHub API headers:', headers);

            try {
                const resGitHub = await fetch(apiUrl, {
                    headers,
                });

                console.log('GitHub API response status:', resGitHub.status);

                if (resGitHub.ok) {
                    const resMdContent = await resGitHub.text();
                    //console.log('Markdown content:', resMdContent);

                    // フロントマターを解析・除去
                    const { content, data } = matter(resMdContent);

                    setMarkdownContent(content);
                    setBlogMeta({
                        title: data.title,
                        topics: data.topics || [],
                    });
                } else {
                    console.error(
                        'Failed to fetch Markdown content from GitHub status:',
                        resGitHub.status,
                    );
                    return;
                }
            } catch (error) {
                console.error('API Error:', error);
                return;
            }
        };

        if (!isLoading && isLoggedIn) {
            localFetchBlogById();
        }
    }, [isLoading, isLoggedIn, blogId]);

    // ブログ削除
    const handleDeleteBlog = async (blogId: string) => {
        if (confirm('本当に削除しますか？')) {
            try {
                const ret = await deleteBlog(blogId);
                if (ret) {
                    router.push('/blog');
                }
            } catch (error) {
                console.error('Failed to delete blog:', error);
            }
        }
    };

    const handleAddComment = () => {
        if (comment) {
            setComments([...comments, { text: comment, user: 'ゲストユーザー' }]);
            setComment('');
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
                            <h3 className="text-lg font-semibold mb-2">コメント</h3>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="コメントを書く..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-[#4a90e2] hover:bg-[#3b7ac7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                            >
                                コメントを追加
                            </button>
                            <ul className="mb-4">
                                {comments.map((comment, index) => (
                                    <li key={index} className="p-2 border-b border-gray-200">
                                        <strong>{comment.user}</strong>: {comment.text}
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
