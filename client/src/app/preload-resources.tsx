'use client';

import ReactDOM from 'react-dom';

ReactDOM.preconnect(process.env.NEXT_PUBLIC_API_BASE_URL as string, { crossOrigin: 'anonymous' });
