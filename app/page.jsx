/* <localhost3000 /> */
import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Tjanster from "@components/Tjanster/Tjanster";
import Nationer from "@components/Nationer/Nationer";
import Organisationer from "@components/Organisationer/Organisationer";

const Home = () => {
  return (
    <div>
      <LandingSection />
      <Syfte />
      <OmOss/>
      <Tjanster/>
      <Nationer/>
      <Organisationer/>

    </div>
  );
};

export default Home;
