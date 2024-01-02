import "./Jobb.css"

const Jobb = () => {
  return (
    <div className="jobb-section-wrapper">
      <div className="office-picture"></div>
      <div className="container-large">
        <div className="padding-section-xl">
          <div className="jobb-content-wrapper">
            <div className="jobb-text-wrapper">
              <img src="/prefix-icon.svg" alt="Left" />
              <h6> Jobb </h6>
            </div>
            <h1>Vill du jobba hos oss?</h1>
            <p>
              Vi växer och anställer talanger som delar vår vision och som vill
              hjälpa våra kunder genom att göra det svåra enkelt. Tillsammans
              utvecklar vi cybersäkerhetslösningar som försvarar demokratin och
              vår livsstil. Bygg cybersäkerhet tillsammans med oss!
            </p>
            <button>se lediga tjänster</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobb;
