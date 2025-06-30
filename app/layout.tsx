import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";


export const metadata: Metadata = {
  title: "Gospives",
  description: "Football player management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased montserrat`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
