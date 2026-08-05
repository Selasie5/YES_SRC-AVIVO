import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/yebs-logo.jpeg",
  },
};

export default function YebsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
