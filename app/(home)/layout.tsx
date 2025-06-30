import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";

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
      <body className="">
          <Navbar />
          {children}
      </body>
    </html>
  );
}
