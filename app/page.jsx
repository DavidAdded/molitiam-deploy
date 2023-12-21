/* <localhost3000 /> */
import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Tjanster from "@components/Tjanster/Tjanster";
import Nationer from "@components/Nationer/Nationer";
import Organisationer from "@components/Organisationer/Organisationer";
import Verksamheter from "@components/Verksamheter/Verksamheter";
import Nyheter from "@components/Nyheter/Nyheter";

const Home = () => {
  return (
    <div>
      <LandingSection />
      <Syfte />
      <OmOss/>
      <Tjanster/>
      <Nationer/>
      <Organisationer/>
      <Verksamheter/>
      <Nyheter/>

    </div>
  );
};

export default Home;
