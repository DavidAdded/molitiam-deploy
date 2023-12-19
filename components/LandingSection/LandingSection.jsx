import "./LandingSection.css";

const LandingSection = () => {
  return (
    <div className="landing-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="landing-content-wrapper">
              <div className="picture-wrapper">
                <img src="/camoimage.png" alt="Landing picture" />
                <div className="landing-grey-image"></div>
              </div>
              <div className="text-wrapper">
                <h1>CYBERSÄKERHET FÖR SAMHÄLLSVIKTIG VERKSAMHET</h1>
                <p>Försvarsteknologi. Säkert. Enkelt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
