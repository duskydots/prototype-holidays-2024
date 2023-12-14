import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { classnames } from "@/utils/classname";
import Script from "next/script";

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const title = "DuskyDots | Creative Digital Studio - Happy Holidays 2024";
const description =
  "DuskyDots is a creative digital studio providing fullstack web and mobile development. We build high quality digital products and interactive experiences for humans.";
const url = "https://happyholidays.duskydots.com";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    url,
    description,
    images: [
      {
        url: `${url}/assets/share.png`,
        width: 1920,
        height: 1080,
        alt: title,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classnames(
          "text-white bg-neutral-950",
          fontRoboto.className
        )}
      >
        {process.env.TAG_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              async
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.TAG_GOOGLE_ANALYTICS_ID}`}
            />
            <Script strategy="beforeInteractive" id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.TAG_GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
