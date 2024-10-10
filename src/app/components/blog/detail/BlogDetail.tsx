'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';

interface BlogDetailProps {
    blogId: string;
}

type ContentItem = {
    type: string;
    content: string;
};

/**
 * ブログ詳細コンポーネント
 * @param blogId
 * @returns JSX
 */
const BlogDetail = ({ blogId }: BlogDetailProps) => {
    const categories = ['全て', 'フロントエンド', 'バックエンド', 'DevOps', 'AI/機械学習'];
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('全て');
    const [comment, setComment] = useState('');
    const { isLoggedIn, user, handleLoginForm, handleLogout } = useUser({ loginUser: null });

    const [blog, setBlog] = useState({
        id: 1,
        title: 'Reactの最新フック活用法',
        excerpt: 'useEffectとuseCallbackの効果的な使い方',
        content: [
            { type: 'h1', content: 'Reactの最新フック活用法' },
            {
                type: 'p',
                content:
                    'Reactの最新フックを活用することで、コンポーネントのパフォーマンスを大幅に向上させることができます。',
            },
            { type: 'h2', content: 'useEffect' },
            { type: 'p', content: 'useEffectは副作用を扱うための強力なツールです。' },
            {
                type: 'code',
                content:
                    'useEffect(() => {\n  // ここに副作用のコードを書く\n  return () => {\n    // クリーンアップ関数\n  };\n}, [依存配列]);',
            },
            { type: 'h2', content: 'useCallback' },
            {
                type: 'p',
                content: 'useCallbackはコールバック関数の不要な再生成を防ぎます。',
            },
            {
                type: 'code',
                content:
                    'const memoizedCallback = useCallback(\n  () => {\n    doSomething(a, b);\n  },\n  [a, b],\n);',
            },
            {
                type: 'p',
                content:
                    'これらを適切に使用することで、アプリケーションの応答性と効率性が向上します。',
            },
        ],
        tags: ['React', 'JavaScript'],
        category: 'フロントエンド',
        createdAt: '2023-10-01',
        updatedAt: '2023-10-05',
    });

    const [comments, setComments] = useState([
        { text: 'とても役に立ちました！', user: 'ユーザーA' },
        { text: 'もう少し詳しくお願いします。', user: 'ユーザーB' },
        { text: '素晴らしい記事です。', user: 'ユーザーC' },
    ]);

    const handleCreateBlog = () => {
        router.push('/blog/create');
    };

    const renderContent = (content: ContentItem[]) => {
        return content.map((item, index) => {
            switch (item.type) {
                case 'h1':
                    return (
                        <h1 key={index} className="text-3xl font-bold my-4">
                            {item.content}
                        </h1>
                    );
                case 'h2':
                    return (
                        <h2 key={index} className="text-2xl font-semibold my-3">
                            {item.content}
                        </h2>
                    );
                case 'p':
                    return (
                        <p key={index} className="my-2">
                            {item.content}
                        </p>
                    );
                case 'code':
                    return (
                        <pre key={index} className="bg-gray-100 p-2 rounded my-2 overflow-x-auto">
                            <code>{item.content}</code>
                        </pre>
                    );
                default:
                    return null;
            }
        });
    };

    const handleEditBlog = (blogId: number) => {
        router.push(`/blog/edit/${blogId}`);
    };

    const handleDeleteBlog = (blogId: number) => {
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
            isLoggedIn={isLoggedIn}
            loginUser={user}
            handleCreateBlog={handleCreateBlog}
            handleLogout={handleLogout}
            handleLogin={handleLoginForm}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        >
            <main className="flex-grow p-4">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                    <div className="flex space-x-4 mb-2">
                        <p className="text-sm text-gray-600">カテゴリー: {blog.category}</p>
                        <p className="text-sm text-gray-600">タグ: {blog.tags.join(', ')}</p>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <p className="text-sm text-gray-600">作成日: {blog.createdAt}</p>
                        <p className="text-sm text-gray-600">更新日: {blog.updatedAt}</p>
                    </div>
                    <div className="mb-4 border-t border-b border-gray-200 py-4">
                        <h3 className="text-lg font-semibold mb-2">概要</h3>
                        <p className="mb-4">{blog.excerpt}</p>
                        <h3 className="text-lg font-semibold mb-2">内容</h3>
                        <div>{renderContent(blog.content)}</div>
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
        </BlogMainLayout>
    );
};

export default BlogDetail;
