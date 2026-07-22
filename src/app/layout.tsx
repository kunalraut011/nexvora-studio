import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

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
  description:
    'We Design Websites That Turn Visitors Into Customers. Fast-loading, scalable, and beautifully designed web experiences for ambitious startups and premium brands.',

  keywords:
    'web design, UI/UX, Next.js agency, premium web development, SaaS design, branding, Framer motion, React development',

  metadataBase: new URL('https://nexvora-studio-18kb.vercel.app'),

  verification: {
    google: 'n039GAtjXvEbKgH',
  },

  openGraph: {
    title: 'Nexvora Studio | Premium Web Design Agency',
    description: 'We Design Websites That Turn Visitors Into Customers.',
    url: 'https://nexvora-studio-18kb.vercel.app',
    siteName: 'Nexvora Studio',
    locale: 'en_US',
    type: 'website',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sora.variable} font-sans bg-background text-white antialiased overflow-x-hidden`}>
  {children}

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-GN7L0T7GNZ"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GN7L0T7GNZ');
    `}
  </Script>
  <Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xqjszdbsdn");
  `}
</Script>
</body>
    </html>
  );
}