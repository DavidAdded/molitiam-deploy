import "@styles/globals.css";

import Navbar from "@components/Navbar/Navbar";

const RootLayout = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/mollitiam-favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/mollitiam-webclip.png" />
      </head>
      <body suppressHydrationWarning>
        <div className="main">
          <Navbar></Navbar>
          <main className="app">
            <div>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
