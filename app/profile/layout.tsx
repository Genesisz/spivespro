import type { Metadata } from "next";
import Navbar from "@/components/layout/profile/navbar";
import NewsLetter from "@/components/layout/profile/news-letter";
import Footer from "@/components/layout/profile/footer";
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
      <body>
          <Navbar />
          {children}
          <NewsLetter />
          <Footer />
      </body>
    </html>
  );
}
