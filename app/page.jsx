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
      <div id="syfte"><Syfte /></div>
      <div id="omoss"><OmOss /></div>
      <div id="tjanster"><Tjanster /></div>
      <div id="nationer"><Nationer /></div>
      <div id="organisationer"><Organisationer /></div>
      {/* <div id="verksamheter"><Verksamheter /></div> */}
      <div id="nyheter"><Nyheter /></div>
      <div id="jobb"><Jobb /></div>
      <div id="kontakt"><Kontakt /></div>
      {/* Add Eng section here if needed */}
    </div>
  );
};

export default Home;
