import "./OmOss.css";

const OmOss = () => {
  return (
    <div className="omoss-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="omoss-section-wrapper">
              <div className="omoss-section-column">
                <h6>Om Oss</h6>
                <h2>Enkelt att använda</h2>
                <h2>Enkelt att köpa</h2>
                <p>
                  Vi är totalleverantör till samhällsviktig verksamhet.
                  Avancerad försvarsteknologi som skyddar det mest skyddsvärda
                  för samhällsviktig verksamhet och en helt ny nivå av
                  användarvänlighet gör våra lösningar enkla att använda och
                  enkla att köpa.
                </p>
              </div>
              <div className="omoss-section-column">
                <div className="omoss-section-column-content">
                  <div className="omoss-section-column-content-top">
                    <img src="/logowhite.svg" alt="Logo" />{" "}
                  </div>
                  <div className="omoss-section-column-content-middle">
                    <div className="vertical-black-line"></div>
                    <div className="vertical-black-line"></div>
                  </div>
                  <div className="omoss-section-column-content-bottom">
                    <div className="omoss-section-column-content-bottom-left">
                      <p>Cybersäkerhets-tjänster</p>
                    </div>
                    <div className="omoss-section-column-content-bottom-right">
                      <p>Cybersäkerhets-produkter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmOss;
