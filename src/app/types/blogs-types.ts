/**
 * @description: Type for the raw blog post (from API)
 */
export interface RawBlogType {
    id: string;
    user_id: string;
    title: string;
    description: string;
    github_url: string;
    category: string;
    tags: string;
    likes: number;
    created_at: string;
    updated_at: string;
}

/**
 * @description: Type for the blog post
 */
export interface BlogType {
    id: string;
    userId: string;
    title: string;
    description: string;
    githubUrl: string;
    category: string;
    tags: string[];
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @description: Type for the blog like
 */
export interface BlogCreateFormType {
    title: string;
    description: string;
    githubUrl: string;
    category: string;
    tags: string;
}
