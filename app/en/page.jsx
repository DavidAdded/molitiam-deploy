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

const Home = (props) => {
  const lang = props.lang;
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
      <LandingSection lang={"en"} />
      <div id={urlPoints.syfte}>
        <Syfte lang={"en"} />
      </div>
      <div id={urlPoints.omoss}>
        <OmOss lang={"en"} />
      </div>
      <div id={urlPoints.tjanster}>
        <Tjanster lang={"en"} />
      </div>
      <div id={urlPoints.nationer}>
        <Nationer lang={"en"} />
      </div>
      <div id={urlPoints.organisationer}>
        <Organisationer lang={"en"} />
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter lang={"en"} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter lang={"en"} />
      </div>
      <div id={urlPoints.jobb}>
        <Jobb lang={"en"} />
      </div>
      <div id={urlPoints.kontakt}>
        <Kontakt lang={"en"} />
      </div>
    </div>
  );
};

export default Home;
