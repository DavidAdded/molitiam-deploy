import "./Nationer.css";

const Nationer = () => {
  return (
    <div className="padding-global">
      <div className="container-large">
        <div className="padding-section-large">
          <div className="nationer-section-wrapper">
            <div className="nationer-content-wrapper-top">
              <div className="nationer-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> Nationer </h6>
              </div>
              <h2>Cybersäkerhet för nationer</h2>
              <p>
                Nationella försvar och säkerhetskänslig verksamhet söker
                ackrediterade cybersäkerhetslösningar som uppfyller
                säkerhetsskyddslagstiftningens höga krav i kombination med
                användarvänlighet.
              </p>
              <p>
                CR Group är den enda leverantören av krypteringsprodukter för
                säkerhetsklassificerad information på̊ nivån begränsat hemligt i
                Sverige.
              </p>
            </div>

            <div className="nationer-content-wrapper-bottom">
              <div className="nationer-content-bottom">
                <img src="/nationer-phone.png" alt="Phone" />
                <h5>Möjliggör mobilt arbete</h5>
              </div>
              <div
                className="nationer-content-bottom"
                style={{ backgroundColor: "#262626" }}
              >
                <img src="/nationer-device.png" alt="Device" />
                <h5>Krypterar kommunikation</h5>
              </div>
              <div
                className="nationer-content-bottom"
                style={{ backgroundColor: "#0D0D0D" }}
              >
                <img src="/nationer-router.png" alt="Router" />
                <h5>Säkrar nätverk</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nationer;
