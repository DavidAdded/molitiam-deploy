import "./LandingSection.css";


const LandingSection = () => {
  return (
    <div className="landing-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="landing-content-wrapper">
              <div className="picture-wrapper">
                <img src='/camoimage.png' alt="Landing picture"/>
                <div className="landing-grey-image"></div>
              </div>
              <h1>CYBERSÄKERHET FÖR SAMHÄLLSVIKTIG VERKSAMHET</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
