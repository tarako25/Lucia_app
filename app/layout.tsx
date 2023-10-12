import "./globals.css";

import Link from "next/link";

export const metadata = {
  title: "Username and password auth with Lucia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative">
          <div className="flex justify-center text-center">
            <div className="h-full w-[900px]">
              <Link href="./">
                <div className="my-14 text-3xl font-bold italic">
                  Message_App
                </div>
              </Link>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
