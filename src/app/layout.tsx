import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal Pokédex",
  description: "A minimal Pokédex to browse, search and sort the original 151 Pokémon.",
  icons: [{ rel: "icon", url: "/jifflypuff.gif" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {children}
        <footer className="mx-auto flex justify-center px-4 pb-8 pt-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-4 py-1.5">
            <span>
              Made by{" "}
              <a
                href="https://artifactz.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline underline-offset-4"
              >
                artifactz
              </a>
            </span>
            <span className="text-gray-300" aria-hidden>
              |
            </span>
            <a
              href="https://github.com/artifactz1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 underline underline-offset-4"
            >
              GitHub
            </a>
          </span>
        </footer>
      </body>
    </html>
  );
}
