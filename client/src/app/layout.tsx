import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { notoSerif, roboto } from '@/assets/fonts';
import { Header, Toaster } from '@/components';
import { default as Providers } from '@/providers';
import '../styles/index.css';
import './preload-resources';

const title = 'BLOTT | Finance Digest';
const description =
  'A central hub for all things finance. Get the latest news, insights, and analysis on the financial world.';
const url = 'https://blot-finance-digest-client.vercel.app';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Finance', 'News', 'Posts', 'Articles', 'Analysis', 'Insights'],
  openGraph: {
    title,
    description,
    url,
    siteName: 'Finance Digest',
    images: [
      {
        url: `${url}/og.png`,
        width: 600,
        height: 600
      }
    ],
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      'index': true,
      'follow': false,
      'noimageindex': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${url}/og.png`]
  },
  category: 'entertainment'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${notoSerif.variable} min-h-svh flex flex-col justify-between`}>
        <Providers>
          <Suspense>
            <Header />
            {children}
          </Suspense>
        </Providers>
        <Toaster
          richColors
          theme="light"
          closeButton
          toastOptions={{
            duration: 4 * 1000,
            classNames: {
              toast: 'group group-[.toaster]:pointer-events-auto'
            }
          }}
        />
      </body>
    </html>
  );
}
