import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components';
import { Toaster } from '@/components/common/core';
import { default as Providers } from '@/providers';
import './globals.css';
import './preload-resources';

const inter = Inter({ subsets: ['latin'] });

const title = 'BLOTT | Finance Digest';
const description =
  'A central hub for all things finance. Get the latest news, insights, and analysis on the financial world.';
const url = 'https://blott-finance-digest.vercel.app';

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
      <body className={`${inter.className} min-h-svh flex flex-col justify-between`}>
        <Providers>
          <Header />
          {children}
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
