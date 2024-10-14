'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import { BlogType, RawBlogType } from '@/app/types/blogs-types';
import { conversionFromRawBlogTypeToBlogType } from '@/app/utils/conversion';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';

interface BlogDetailProps {
    blogId: string;
}

// type ContentItem = {
//     type: string;
//     content: string;
// };

/**
 * ブログ詳細コンポーネント
 * @param blogId
 * @returns JSX
 */
// 一時的
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlogDetail = ({ blogId }: BlogDetailProps) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('全て');
    const categories = ['全て', 'フロントエンド', 'バックエンド', 'DevOps', 'AI/機械学習'];
    const [comment, setComment] = useState('');
    const { isLoading, isLoggedIn, user, handleLoginForm, handleLogout } = useUser();
    const [blog, setBlog] = useState<BlogType>();

    const [comments, setComments] = useState([
        { text: 'とても役に立ちました！', user: 'ユーザーA' },
        { text: 'もう少し詳しくお願いします。', user: 'ユーザーB' },
        { text: '素晴らしい記事です。', user: 'ユーザーC' },
    ]);

    useEffect(() => {
        // ブログの取得処理を実装する
        const fetchBlogById = async () => {
            try {
                const response = await fetch(`/api/blog/detail/${blogId}`);
                if (response.ok) {
                    const responseData: RawBlogType = await response.json();
                    //console.log('fetch blog by id GET response data:', responseData);

                    // RawBlogType から BlogType に変換
                    const changedBlogs: BlogType =
                        conversionFromRawBlogTypeToBlogType(responseData);
                    setBlog(changedBlogs);
                } else {
                    console.error('Failed to fetch blog by id');
                }
            } catch (error) {
                console.error('Server error:', error);
            }
        };

        if (!isLoading && isLoggedIn) {
            fetchBlogById();
        }
    }, [isLoading, isLoggedIn, blogId]);

    const handleCreateBlog = () => {
        router.push('/blog/create');
    };

    // const renderContent = (content: ContentItem[]) => {
    //     return content.map((item, index) => {
    //         switch (item.type) {
    //             case 'h1':
    //                 return (
    //                     <h1 key={index} className="text-3xl font-bold my-4">
    //                         {item.content}
    //                     </h1>
    //                 );
    //             case 'h2':
    //                 return (
    //                     <h2 key={index} className="text-2xl font-semibold my-3">
    //                         {item.content}
    //                     </h2>
    //                 );
    //             case 'p':
    //                 return (
    //                     <p key={index} className="my-2">
    //                         {item.content}
    //                     </p>
    //                 );
    //             case 'code':
    //                 return (
    //                     <pre key={index} className="bg-gray-100 p-2 rounded my-2 overflow-x-auto">
    //                         <code>{item.content}</code>
    //                     </pre>
    //                 );
    //             default:
    //                 return null;
    //         }
    //     });
    // };

    const handleEditBlog = (blogId: string) => {
        router.push(`/blog/edit/${blogId}`);
    };

    // 一時的
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteBlog = (blogId: string) => {
        if (confirm('本当に削除しますか？')) {
            router.push('/blog');
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
            loginUser={user}
            handleCreateBlog={handleCreateBlog}
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
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>

                        <div className="flex space-x-4 mb-2">
                            <p className="text-sm text-gray-600">カテゴリー: {blog.category}</p>
                            <p className="text-sm text-gray-600">タグ: {blog.tags.join(', ')}</p>
                        </div>

                        <div className="flex space-x-4 mb-4">
                            <p className="text-sm text-gray-600">
                                作成日: {blog.createdAt.toString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                更新日: {blog.updatedAt.toString()}
                            </p>
                        </div>

                        <div className="mb-4 border-t border-b border-gray-200 py-4">
                            <h3 className="text-lg font-semibold mb-2">概要</h3>
                            <p className="mb-4">{blog.description}</p>
                            {/* <h3 className="text-lg font-semibold mb-2">内容</h3>
                            <div>{renderContent(blog.content)}</div> */}
                        </div>

                        <div className="flex justify-end items-center space-x-2 mb-4">
                            <button
                                onClick={() => alert('いいねが追加されました！')}
                                className="text-[#4a90e2] hover:text-[#3b7ac7] font-bold py-2 px-4 focus:outline-none focus:shadow-outline ml-2"
                            >
                                ❤️ 0
                            </button>
                            <button
                                onClick={() => handleEditBlog(blog.id)}
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
