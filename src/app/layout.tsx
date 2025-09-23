import { GoogleAnalytics } from '@next/third-parties/google';

import type { Metadata } from 'next';
import { Geist_Mono, Kanit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['thai', 'latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'จารย์ไหนวะ',
  description: 'หาอาจารย์จากตัวย่อ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <link rel="icon" type="image/svg+xml" href="/fav.svg" />
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-CWCBJE4H99" />
    </html>
  );
}
