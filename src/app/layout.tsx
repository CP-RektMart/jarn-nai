import type { Metadata } from 'next';
import { Geist, Geist_Mono, Kanit } from 'next/font/google';
import './globals.css';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body className={`${kanit.className} ${geistMono.variable} antialiased min-h-dvh`}>{children}</body>
    </html>
  );
}
