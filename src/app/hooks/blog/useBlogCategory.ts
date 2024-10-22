import { useEffect, useState } from 'react';

// constants
import { CommonConstants } from '@/app/utils/constants/common-constants';
// utils
import { fetchBlogCategories } from '@/app/utils/blog/fetch-blog';

/**
 * ブログカテゴリ取得カスタムhooks
 * @returns カスタムhooks
 */
export const useBlogCategory = () => {
    // ブログカテゴリ
    const [blogCategories, setBlogCategories] = useState<string[]>([]);

    useEffect(() => {
        const localFetch = async () => {
            /**
             * ブログカテゴリ取得
             */
            try {
                const responseCategories: string[] = await fetchBlogCategories();
                if (responseCategories) {
                    setBlogCategories([
                        CommonConstants.BLOG_LIST.CATEGORY_ALL,
                        ...responseCategories,
                    ]);
                }
            } catch (error) {
                console.error(`${CommonConstants.ERROR_MESSAGE.API_ROUTER_ERROR}: `, error);
            }
        };

        localFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { blogCategories };
};
