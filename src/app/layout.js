import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shane Abeysekera - Engineer, Creator, Problem Solver",
  keywords: [
    "Shane Abeysekera",
    "Software Engineer",
    "Fullstack Developer",
    "Problem Solver",
    "Digital Experiences",
    "Web Development",
    "Next.js",
    "React",
    "JavaScript",
    "CSS",
    "python",
    "a.i",
    "artificial intelligence",
    "machine learning",
    "portfolio"
  ],
  description: "Portfolio for my personal website to highlight my projects, skills, and experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Great+Vibes&family=Satisfy&family=Pinyon+Script&family=Tangerine&family=Allura&family=Alex+Brush&family=Niconne&family=Lobster&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
