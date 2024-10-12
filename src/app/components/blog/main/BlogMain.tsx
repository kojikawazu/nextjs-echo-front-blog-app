'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { BlogType } from '@/app/types/types';
import { useUser } from '@/app/hooks/useUser';
import BlogMainLayout from '@/app/components/layout/BlogMainLayout';
//import axios from 'axios';
//import ReactMarkdown from 'react-markdown';
//import matter from 'gray-matter';

interface BlogMainProps {
    token: RequestCookie | undefined;
}

/**
 * ブログメインコンポーネント
 * @returns JSX
 */
const BlogMain = ({ token }: BlogMainProps) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('全て');
    const [blogs, setBlogs] = useState<BlogType[]>([
        {
            id: 1,
            title: 'Reactの最新フック活用法',
            excerpt: 'useEffectとuseCallbackの効果的な使い方',
            content: 'ここに詳細な記事内容が入ります。',
            tags: ['React', 'JavaScript'],
            category: 'フロントエンド',
            likes: 0,
        },
        {
            id: 2,
            title: 'Dockerコンテナ最適化テクニック',
            excerpt: '本番環境でのパフォーマンス向上策',
            content: 'ここに詳細な記事内容が入ります。',
            tags: ['Docker', 'DevOps'],
            category: 'DevOps',
            likes: 0,
        },
        {
            id: 3,
            title: 'AIを活用した自動コード生成',
            excerpt: 'GPT-4を使ったコーディング効率化',
            content: 'ここに詳細な記事内容が入ります。',
            tags: ['AI', 'プログラミング'],
            category: 'AI/機械学習',
            likes: 0,
        },
        {
            id: 4,
            title: 'Express.jsでRESTful API開発',
            excerpt: '効率的なバックエンド構築手法',
            content: 'ここに詳細な記事内容が入ります。',
            tags: ['Node.js', 'Express'],
            category: 'バックエンド',
            likes: 0,
        },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading, isLoggedIn, user, handleLoginForm, handleLogout } = useUser({ token });

    const categories = ['全て', 'フロントエンド', 'バックエンド', 'DevOps', 'AI/機械学習'];
    const itemsPerPage = 2;

    // const handleBackClick = () => {
    //     setSelectedBlog(null);
    //     setIsEditing(false);
    // };

    const handleCreateBlog = () => {
        router.push('/blog/create');
    };

    const handleEditBlog = (blogId: number) => {
        router.push(`/blog/edit/${blogId}`);
    };

    const handleDeleteBlog = (blogId: number) => {
        if (confirm('本当に削除しますか？')) {
            setBlogs(blogs.filter((blog) => blog.id !== blogId));
        }
    };

    const handleLikeBlog = (blogId: number) => {
        setBlogs(
            blogs.map((blog) => (blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)),
        );
    };

    const paginateBlogs = (blogs: BlogType[], page: number, itemsPerPage: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        return blogs.slice(startIndex, startIndex + itemsPerPage);
    };

    const filteredBlogs =
        selectedCategory === '全て'
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory);
    const paginatedBlogs = paginateBlogs(filteredBlogs, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    // useEffect(() => {
    //     const fetchMarkdown = async () => {
    //         const url = 'https://github.com/drawdb-io/drawdb/blob/main/README.md'; // 任意のパブリックリポジトリのURL
    //         const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/main\/(.+\.md)$/;
    //         const match = url.match(regex);

    //         if (!match) {
    //             console.error('Invalid GitHub Markdown URL format');
    //             return;
    //         }

    //         const [, repoOwner, repoName, filePath] = match;
    //         const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    //         console.log('API URL:', apiUrl);
    //         console.log('Repo Owner:', repoOwner, 'Repo Name:', repoName, 'File Path:', filePath);

    //         try {
    //             const response = await axios.post('/api/markdown', {
    //                 repoOwner,
    //                 repoName,
    //                 filePath,
    //             });

    //             const content = response.data.content;
    //             console.log('Markdown content:', content);
    //         } catch (error) {
    //             console.error('Failed to fetch Markdown file:', error);
    //         }
    //     };

    //     fetchMarkdown();
    // }, []);

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
            ) : (
                <main className="flex-grow p-4">
                    {/** ブログリスト */}
                    {paginatedBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white shadow-md m-2 p-4 rounded cursor-pointer"
                        >
                            {/** タグ */}
                            <Link href={`/blog/detail/${blog.id}`}>
                                <h2 className="font-bold text-xl mb-2 text-blue-700">
                                    {blog.title}
                                </h2>
                            </Link>
                            <p className="text-gray-700 mb-2">{blog.excerpt}</p>
                            <div className="flex flex-wrap mb-2">
                                {blog.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="bg-gray-200 text-sm rounded-full px-3 py-1 mr-2 mb-2"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/** いいね */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">❤️ {blog.likes}</span>

                                <div className="flex items-center">
                                    {isLoggedIn && (
                                        <>
                                            <button
                                                onClick={() => handleEditBlog(blog.id)}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                                            >
                                                編集
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBlog(blog.id)}
                                                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded ml-2"
                                            >
                                                削除
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => handleLikeBlog(blog.id)}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2"
                                    >
                                        いいね!
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/** ページング */}
                    <div className="mt-4 flex justify-center space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-2 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </main>
            )}
        </BlogMainLayout>
    );
};

export default BlogMain;
