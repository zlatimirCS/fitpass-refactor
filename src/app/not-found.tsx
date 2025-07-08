'use client';

import Error from 'next/error';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang='en'>
      <body>
        <section className='topBottomSpacing'>
          <div className='wrapper'>
            <Error statusCode={404} />;
          </div>
        </section>
      </body>
    </html>
  );
}
