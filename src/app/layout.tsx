import type { Metadata } from "next";
import "../../public/styles.scss";
import Layout from "@/components/organisms/Layout";
import "@/styles/style.scss";
import { ThemeProvider } from "next-themes";
import { Source_Code_Pro } from "next/font/google";
import { classMerge } from "@/helpers/classMerge";
import { PublicEnvScript } from "next-runtime-env";
import { Fonts } from "@/components/atoms/Fonts";

const sourceCodeProFont = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--source-code-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xverse Wallet",
  description: "Get ordinals data",
  authors: [{ name: "Francisco Baralle" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classMerge(sourceCodeProFont.variable, "text-text-default")}
    >
      <head>
        <PublicEnvScript />
      </head>
      <Fonts />
      <body className="bg-background-main">
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute="class"
          storageKey="theme"
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
