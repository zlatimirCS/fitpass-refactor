'use client';

import { useEffect } from 'react';

interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-6'>
        <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full'>
          <svg
            className='w-6 h-6 text-red-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <div className='mt-4 text-center'>
          <h3 className='text-lg font-medium text-gray-900'>
            Something went wrong
          </h3>
          <p className='mt-2 text-sm text-gray-500'>
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className='mt-1 text-xs text-gray-400'>
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
