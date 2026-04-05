import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "Crochet Shop",
  description: "Handmade crochet and knit items — made with love in Nepal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
