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

            <div className="organisationer-content-wrapper-bottom">
                <h1 style= {{color:"white", margin:"200px 0"}}>ANIMATION</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisationer;
