import "./globals.css";
import { Montserrat } from "@next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Star Wars Archives",
  description: "Get information about Star Wars movies and characters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">SWStarter</header>
        {children}
      </body>
    </html>
  );
}
