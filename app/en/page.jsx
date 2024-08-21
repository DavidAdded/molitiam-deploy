import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Verksamheter from "@components/Verksamheter/Verksamheter";
import Nyheter from "@components/Nyheter/Nyheter";
import Footer from "@components/Footer/Footer";

export const metadata = {
  metadataBase: "https://cr.se/en",
  title: "Cyber security for vital societal functions",
  description:
    "CR Group, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
  openGraph: {
    title: "Cyber security for vital societal functions",
    description:
      "CR Group, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
    images: [
      {
        url: "https://cr.se/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Home = (props) => {
  const lang = props.lang;
  const urlPoints = {
    syfte: lang === "sv" ? "syfte" : "purpose",
    omoss: lang === "sv" ? "omoss" : "aboutus",
    nyheter: lang === "sv" ? "nyheter" : "news",
    verksamheter: lang === "sv" ? "verksamheter" : "operations",
  };
  return (
    <div>
      <LandingSection lang={"en"} />
      <div id={urlPoints.syfte}>
        <Syfte lang={"en"} />
      </div>
      <div id={urlPoints.omoss}>
        <OmOss lang={"en"} />
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter lang={"en"} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter lang={"en"} />
      </div>
      <Footer lang={"en"}></Footer>
    </div>
  );
};

export default Home;
