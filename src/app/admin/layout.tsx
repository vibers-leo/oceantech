import Script from 'next/script';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7704550771011130"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
