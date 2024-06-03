import React from 'react';

function LoadingSpinner({ size }) {
    return (
        <>
            <span className={`spinner-border ${size === 'small' && 'spinner-border-sm'}`}>
                <span className="visually-hidden">Loading...</span>
            </span>
        </>
    );
}

export default LoadingSpinner;
