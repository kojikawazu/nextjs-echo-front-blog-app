import { BlogType, RawBlogType } from '@/app/types/types';

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
