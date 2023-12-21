import "./Organisationer.css";

const Organisationer = () => {
  return (
    <div className="organisationer-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="organisationer-content-wrapper-top">
              <div className="organisationer-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> organisationer </h6>
              </div>
              <h2>Cybersäkerhet för organisationer</h2>
              <p>
                Privata företag, myndigheter och offentlig sektor som bedriver
                samhällsviktig verksamhet erbjuds paketerade tjänster och
                produkter.
              </p>
              <p>
                Vår plattform för ackrediterade lösningar till samhällsviktig
                verksamhet, SIRRUS, är en unik användarvänlig plattform som
                erbjuder stor flexibilitet, alltid med gällande lagkrav som
                grund.
              </p>
            </div>

            <div className="organisationer-content-wrapper-bottom">
              <h1 style={{ color: "white", margin: "200px 0" }}>ANIMATION</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisationer;
