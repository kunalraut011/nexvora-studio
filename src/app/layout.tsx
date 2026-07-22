import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Nexvora Studio | Premium Web Design Agency',
  description: 'We Design Websites That Turn Visitors Into Customers. Fast-loading, scalable, and beautifully designed web experiences for ambitious startups and premium brands.',
  keywords: 'web design, UI/UX, Next.js agency, premium web development, SaaS design, branding, Framer motion, React development',
  openGraph: {
    title: 'Nexvora Studio | Premium Web Design Agency',
    description: 'We Design Websites That Turn Visitors Into Customers.',
    url: 'https://nexvorastudio.com',
    siteName: 'Nexvora Studio',
    locale: 'en_US',
    type: 'website',
  },
  verification: {
  google: "n039GAtjXvEbKgH",
},
  twitter: {
    card: 'summary_large_image',
    title: 'Nexvora Studio | Premium Web Design Agency',
    description: 'We Design Websites That Turn Visitors Into Customers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://nexvorastudio.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sora.variable} font-sans bg-background text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
