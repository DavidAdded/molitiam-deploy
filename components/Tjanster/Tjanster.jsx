import "./Tjanster.css";


const Tjanster = () => {
  return (
    <div>
      <div className="tjanster-section-wrapper">
        <div className="padding-global">
          <div className="container-large">
            <div className="tjanster-padding-section-large">
              <div className="tjanster-content-wrapper">
                <div className="tjanster-text-wrapper">
                  <img src="/prefix-icon.svg" alt="Left" />
                  <h6> Tjanster </h6>
                </div>
                <h2>För nationer & organisationer</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tjanster-section-wrapper-bottom">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-mini">
              <div className="tjanster-section-wrapper-bottom-content-wrapper">
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-left.svg" alt="Left" /> <h5>85%</h5>
                  <p>Försvar</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-middle.svg" alt="Middle" />{" "}
                  <h5>10%</h5>
                  <p>Civilt</p>
                </div>
                <div className="tjanster-section-wrapper-bottom-content">
                  <img src="/tjanster-icon-right.svg" alt="Right" /> <h5>5%</h5>
                  <p>Internationellt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tjanster;
