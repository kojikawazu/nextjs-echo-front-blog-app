/**
 * @description: Type for the blog post
 */
export interface BlogType {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    category: string;
    likes: number;
}

export interface UserLoginFormType {
    username: string;
    password: string;
}
