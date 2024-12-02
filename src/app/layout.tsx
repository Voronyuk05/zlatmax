import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/seo.constants";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { Providers } from './providers';
import { DashboardLayout } from '../components/dashboard-layout/DashboardLayout';

const imb = Montserrat({ 
  subsets: ["cyrillic", "latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-zen',
  style: 'normal' 
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${imb.className}`}>
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
