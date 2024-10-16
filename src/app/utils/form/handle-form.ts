/**
 * フォームの変更を処理する
 * @param e
 * @param formData
 * @param setFormData
 */
export const handleFormChange = <T>(
    e: React.ChangeEvent<HTMLInputElement>,
    formData: T,
    setFormData: (value: React.SetStateAction<T>) => void,
) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
