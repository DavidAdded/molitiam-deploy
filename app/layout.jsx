import "@styles/globals.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";

export const metadata = {
  title: "crgroup",
  description: "military things",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="main">
          <Navbar></Navbar>
          <main className="app">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
