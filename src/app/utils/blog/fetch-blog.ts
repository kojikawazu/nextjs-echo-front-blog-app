import { toast } from 'react-toastify';

/**
 * ブログの削除関数
 * @param blogId ブログID
 * @returns true or false
 * @throws Error
 */
export const deleteBlog = async (blogId: string) => {
    try {
        const response = await fetch(`/api/blog/delete/${blogId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log('delete blog by id DELETE response status:', response.status);

        if (response.ok) {
            toast.success('ブログを削除しました。');
            return true;
        } else {
            toast.error('ブログの削除に失敗しました');
            console.error('delete blog by id DELETE from response status:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Failed to delete blog:', error);
        toast.error('ブログの削除に失敗しました');
        throw new Error('Failed to delete blog');
    }
};
