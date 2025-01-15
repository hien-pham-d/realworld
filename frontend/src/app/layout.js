export const metadata = {
  title: "Real World",
  description: "My Real World web app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
