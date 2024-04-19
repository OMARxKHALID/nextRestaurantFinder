import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import Navbar from "@/components/nav/navbar";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "@/lib/providers/client-provider";
import ReduxWrapper from "@/lib/providers/redux-provider";

const inter = Space_Grotesk({ subsets: ["latin"] });
export const metadata = {
  title: "Restaurant Finder",
  description:
    "Discover the perfect dining spot with our Restaurant Finder app. Explore a variety of cuisines, from traditional to western favorites, using Google Maps integration.",
};

export default async function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === "development";
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <body
        className={`${inter.className} bg-[#010106] text-gray-200 antialiased p-10`}
      >
        <NextTopLoader showSpinner={false} color="rgb(34 197 94)" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider session={session}>
            <ReduxWrapper>
              <Navbar />
              <div className="w-full flex-1 ">{children}</div>
            </ReduxWrapper>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
