"use client";
import "./Nyheter.css";
import { useRouter } from "next/navigation";



const Nyheter = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/news");
  };

  return (
    <div className="nyheter-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-content-wrapper">
              <div className="nyheter-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> Nyheter </h6>
              </div>
              <div className="nyheter-content-boxes">
                <div className="nyheter-content-card">
                  <div className="nyheter-content-card-top-left"></div>
                  <div className="nyheter-content-card-bottom">
                    <div className="nyheter-content-card-text-wrapper">
                      <div className="nyheter-date">2024•01•01</div>
                      <h3>Lorem ipsum dolor sit amet</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna.
                      </p>
                    </div>
                    <div className="nyheter-las-mer">
                      <div className="nyheter-las-mer-content">
                        <p>LÄS MER</p>
                        <img src="/right-arrow.svg" />
                      </div>
                    </div>
                    <div className="bottom-corner-cover-up"></div>
                  </div>
                </div>
                <div className="nyheter-content-card">
                  <div className="nyheter-content-card-top-middle"></div>
                  <div className="nyheter-content-card-bottom">
                    <div className="nyheter-content-card-text-wrapper">
                      <div className="nyheter-date">2024•01•01</div>
                      <h3>Lorem ipsum dolor sit amet</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna.
                      </p>
                    </div>
                    <div className="nyheter-las-mer">
                      <div className="nyheter-las-mer-content">
                        LÄS MER
                        <img src="/right-arrow.svg" />
                      </div>
                    </div>
                    <div className="bottom-corner-cover-up"></div>
                  </div>
                </div>
                <div className="nyheter-content-card">
                  <div className="nyheter-content-card-top-right"></div>
                  <div className="nyheter-content-card-bottom">
                    <div className="nyheter-content-card-text-wrapper">
                      <div className="nyheter-date">2024•01•01</div>
                      <h3>Lorem ipsum dolor sit amet</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna.
                      </p>
                    </div>
                    <div className="nyheter-las-mer">
                      <div className="nyheter-las-mer-content">
                        LÄS MER
                        <img src="/right-arrow.svg" />
                      </div>
                    </div>
                    <div className="bottom-corner-cover-up"></div>
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>LÄS ALLA NYHETER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nyheter;
