import React from 'react';

function LoadingSpinner({ size, className }) {
    return (
        <>
            <span className={`spinner-border ${size === 'small' && 'spinner-border-sm'} ${className}`}>
                <span className="visually-hidden">Loading...</span>
            </span>
        </>
    );
}

export default LoadingSpinner;
