"use client";
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
import { useRouter } from 'next/navigation';

const Home = ({params}) => {
  const lang = params.locales;
  const router = useRouter();
  const { locale } = router;

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
      <LandingSection params={params}/>
      <div id={urlPoints.syfte}>
        <Syfte params={params}/>
      </div>
      <div id={urlPoints.omoss}>
        <OmOss params={params}/>
      </div>
      <div id={urlPoints.tjanster}>
        <Tjanster params={params}/>
      </div>
      <div id={urlPoints.nationer}>
        <Nationer params={params}/>
      </div>
      <div id={urlPoints.organisationer}>
        <Organisationer params={params}/>
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter params={params} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter params={params} />
      </div>
      <div id={urlPoints.jobb}>
        <Jobb params={params}/>
      </div>
      <div id={urlPoints.kontakt}>
        <Kontakt params={params}/>
      </div>
    </div>
  );
};



export default Home;
