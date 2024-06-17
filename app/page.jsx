import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Tjanster from "@components/Tjanster/Tjanster";
import Nationer from "@components/Nationer/Nationer";
import Organisationer from "@components/Organisationer/Organisationer";
import Verksamheter from "@components/Verksamheter/Verksamheter";
import Nyheter from "@components/Nyheter/Nyheter";
import Jobb from "@components/Jobb/Jobb";
import Kontakt from "@components/Kontakt/Kontakt";

export const metadata = {
  metadataBase: "https://cr.se",
  title: "Cybersäkerhet för samhällsviktig verksamhet",
  description:
    "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
  openGraph: {
    title: "Cybersäkerhet för samhällsviktig verksamhet",
    description:
      "CR Group är cybersäkerhetsföretaget som erbjuder avancerad försvarsteknologi för samhällsviktig verksamhet. Skydda det mest kritiska med användarvänliga och lättillgängliga lösningar",
    images: [
      {
        url: "https://cr.se/opengraph.png",
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
    tjanster: lang === "sv" ? "tjanster" : "services",
    nyheter: lang === "sv" ? "nyheter" : "news",
    verksamheter: lang === "sv" ? "verksamheter" : "operations",
    jobb: lang === "sv" ? "jobb" : "jobs",
    kontakt: lang === "sv" ? "kontakt" : "contact",
    nationer: lang === "sv" ? "nationer" : "nations",
    organisationer: lang === "sv" ? "organisationer" : "organisations",
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
      <div id={urlPoints.tjanster}>
        <Tjanster lang={"sv"} />
      </div>
      <div id={urlPoints.nationer}>
        <Nationer lang={"sv"} />
      </div>
      <div id={urlPoints.organisationer}>
        <Organisationer lang={"sv"} />
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter lang={"sv"} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter lang={"sv"} />
      </div>
      <div id={urlPoints.jobb}>
        <Jobb lang={"sv"} />
      </div>
      <div id={urlPoints.kontakt}>
        <Kontakt lang={"sv"} />
      </div>
    </div>
  );
};

export default Home;
