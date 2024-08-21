import "./Footer.css";

const Footer = (props) => {
  const lang = props.lang;

  const addressText = lang === "sv" ? "Besöksadress" : "Address";
  const postAddressText = lang === "sv" ? "Postadress" : "Zipcode";
  
  return (
    <div className="footer-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="footer-content-wrapper">
              <img src="/logo-white-text.png" alt="Logo" />
              <div className="breakline" />
              <div className="footer-contact-wrapper">
                <div className="footer-contact-content-left">
                  <p>
                    <b>{addressText}</b>
                  </p>
                  <p>Mollitiam AB</p>
                  <p>Brunkebergsgatan 10</p>
                  <p>111 52, Stockholm</p>
                  <div className="copyright">
                    <p>Copyright Mollitiam AB 2024</p>
                  </div>
                </div>
                <div className="footer-contact-content-middle">
                  <p>
                    <b>{postAddressText}</b>
                  </p>
                  <p>Mollitiam AB</p>
                  <p>Aspövägen 41</p>
                  <p>125 40, Älvsjö</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
