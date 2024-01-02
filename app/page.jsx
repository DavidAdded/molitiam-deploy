/* <localhost3000 /> */
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

const Home = () => {
  return (
    <div>
      <LandingSection />
      <Syfte />
      <OmOss />
      <Tjanster />
      <Nationer />
      <Organisationer />
      <Verksamheter />
      <Nyheter />
      <Jobb></Jobb>
      <Kontakt></Kontakt>
    </div>
  );
};

export default Home;
