import "./globals.css";

export const metadata = {
  title: "Pooja Creation - Premium Gift Hampers",
  description:
    "Premium customized gift hampers by Pooja Creation. Order birthday, engagement, anniversary, love, chocolate & rose, dry fruit and Kanjak hampers on WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}