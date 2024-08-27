import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Verksamheter from "@components/Verksamheter/Verksamheter";
import Nyheter from "@components/Nyheter/Nyheter";
import Footer from "@components/Footer/Footer";

export const metadata = {
  metadataBase: "https://mollitiam.se",
  title: "Cybersäkerhet för samhällsviktig verksamhet",
  description:
    "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
  openGraph: {
    title: "Cybersäkerhet för samhällsviktig verksamhet",
    description:
      "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
    images: [
      {
        url: "https://mollitiam.se/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Home = () => {
  const lang = "sv";
  const urlPoints = {
    syfte: lang === "sv" ? "syfte" : "purpose",
    omoss: lang === "sv" ? "omoss" : "aboutus",
    nyheter: lang === "sv" ? "nyheter" : "news",
    verksamheter: lang === "sv" ? "cr-group" : "operations",
  };

  return (
    <div>
      <LandingSection lang={"sv"} />
      <div id={urlPoints.syfte}>
        <Syfte lang={"sv"} />
      </div>
      <div id={urlPoints.omoss}>
        <OmOss lang={"sv"} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter lang={"sv"} />
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter lang={"sv"} />
      </div>
      <Footer lang={"sv"}></Footer>
    </div>
  );
};

export default Home;
