//import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import Header from '@/app/components/header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
