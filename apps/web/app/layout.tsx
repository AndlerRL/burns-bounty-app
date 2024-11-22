import { Public_Sans } from "next/font/google";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/Navbar";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const responseHeaders = (await headers()).get("cookie")
  // const initialState = cookieToInitialState(
  //   getConfig(),
  //   responseHeaders,
  // );
  return (
    <html lang="en">
      <head>
        <title>LangChain + Next.js Template</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta property="og:title" content="LangChain + Next.js Template" />
        <meta
          property="og:description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LangChain + Next.js Template" />
        <meta
          name="twitter:description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta name="twitter:image" content="/images/og-image.png" />
      </head>
      <body className={publicSans.className}>
        {/* <Providers initialState={initialState}> */}
        <Providers>
          <div className="flex flex-col p-4 md:p-12 h-[100vh]">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
