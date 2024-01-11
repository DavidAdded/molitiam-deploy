import "@styles/globals.css";
//import "@styles/normalize.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";


export const metadata = {
  title: "crgroup",
  description: "CR Group",
};

const RootLayout = ({ children, params }) => {

  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning>
        <div className="main">
          <Navbar params={params}></Navbar>
          <main className="app">
            <div>{children}</div>
          </main>
          <Footer params= {params}></Footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
