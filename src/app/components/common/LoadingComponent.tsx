import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

/**
 * ローディングコンポーネント
 * @returns JSX
 */
const LoadingComponent = () => {
    return <ClipLoader color={'#4a90e2'} loading={true} size={20} />;
};

export default LoadingComponent;
