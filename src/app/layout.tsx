import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Next-Inns",
  description:
    "Aqui você encontra o hotel perfeito para sua viagem, seja para negócios ou lazer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <main className="font-normal">
          <Header />
          {children}
          {/* Footer */}
        </main>
      </body>
    </html>
  );
}
