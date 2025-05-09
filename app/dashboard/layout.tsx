import type { Metadata } from "next";
import Navbar from "@/components/layout/dashboard/navbar";
import NewsLetter from "@/components/layout/dashboard/news-letter";
import Footer from "@/components/layout/dashboard/footer";
export const metadata: Metadata = {
  title: "GO Spives",
  description: "Go spives Pro 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
          <Navbar />
          {children}
          <NewsLetter />
          <Footer />
      </body>
    </html>
  );
}
