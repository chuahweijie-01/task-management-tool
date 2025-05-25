import type { Metadata } from "next";
import "./styles/globals.css";
import Body from "./components/Body";
import { ToastProvider } from "./contexts/ToastContext";

export const metadata: Metadata = {
  title: "TMT",
  description: "A site where you can manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </Body>
    </html>
  );
}
