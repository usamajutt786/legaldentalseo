import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'LexScale | Law Firm Programmatic SEO & Web Platform',
  description: 'Enterprise programmatic SEO engine and high-converting law-firm website platform. Scale from 15 to 2,000+ local practice area pages with automated Surfer SEO optimization, CallRail tracking, and dynamic schema.',
  openGraph: {
    title: 'LexScale | Law Firm Programmatic SEO & Web Platform',
    description: 'Enterprise programmatic SEO engine and high-converting law-firm website platform. Scale from 15 to 2,000+ local practice area pages with automated Surfer SEO optimization, CallRail tracking, and dynamic schema.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexScale | Law Firm Programmatic SEO & Web Platform',
    description: 'Enterprise programmatic SEO engine and high-converting law-firm website platform. Scale from 15 to 2,000+ local practice area pages with automated Surfer SEO optimization, CallRail tracking, and dynamic schema.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
