import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SleekPrint",
  description: "Custom Printed Merchandise Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar /> {/* ✅ Navbar is now separate */}
        <main className="flex-grow">{children}</main>{" "}
        {/* ✅ Pushes footer to bottom */}
        <Footer /> {/* ✅ Footer is now separate */}
      </body>
    </html>
  );
}
