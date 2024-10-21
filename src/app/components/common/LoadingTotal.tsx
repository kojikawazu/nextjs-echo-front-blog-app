import React from 'react';
import LoadingComponent from '@/app/components/common/LoadingComponent';

/**
 * ローディングトータルコンポーネント
 * @returns JSX
 */
const LoadingTotal = () => {
    return (
        <div className="flex-grow p-4 flex items-center justify-center">
            <LoadingComponent />
        </div>
    );
};

export default LoadingTotal;
