'use client';

import { useState } from 'react';

export default function ExampleWithError() {
  const [shouldError, setShouldError] = useState(false);

  // This will trigger the error.tsx component
  if (shouldError) {
    throw new Error('This is a test error!');
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Error Testing Component</h2>
      <button
        onClick={() => setShouldError(true)}
        className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
      >
        Trigger Error
      </button>
    </div>
  );
}
