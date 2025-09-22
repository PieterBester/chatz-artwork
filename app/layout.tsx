import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artwork Autobrander - Chatz Connect',
  description: 'Automatically brand your Vodacom/Chatz artwork with store details and logos',
  keywords: 'artwork, branding, vodacom, chatz connect, design, automation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
