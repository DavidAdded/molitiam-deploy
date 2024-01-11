import "./Footer.css";

const Footer = () => {
  const lang = "sv";


  const addressText = lang === "sv" ? "Besöksadress" : "Address";
  const postAddressText = lang === "sv" ? "Postadress" : "Zipcode";

  const footerText = lang === "sv" ? "Kontakt" : "Contact";
  const contactContentText1 = lang === "sv" ? "CR Group är ett svenskt cybersäkerhetsföretag som utvecklar paketerade och användarvänliga digitala lösningar församhällsviktig verksamhet." : "CR Group is a Swedish cybersecurity company that develops packaged and user-friendly digital solutions for critical societal operations.";
  const contactContentText2 = lang === "sv" ? "Kunderna utgörs av försvar, myndigheter och näringsliv iSverige och Europa." : "The customers consist of defense, government agencies, and businesses in Sweden and Europe.";
  const contactContentText3 = lang === "sv" ? "Huvudägare är Formica Capital I AB. VD är Björn Weigel. Styrelseordförande är Nicklas Storåkers." : "The main owner is Formica Capital I AB. The CEO is Björn Weigel. The Chairman of the Board is Nicklas Storåkers.";
  return (
    <div className="footer-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="footer-content-wrapper">
              <img src="/logowhite.svg" alt="Logo" />
              <div className="breakline" />
              <div className="footer-contact-wrapper">
                <div className="footer-contact-content-left">
                  <p style={{ fontWeight: 700 }}>{addressText}</p>

                  <p>CR Group AB</p>
                  <p>Hovslagargatan 5b</p>
                  <p>Blasieholmen, Stockholm</p>
                  <p>+46 8 551 102 40</p>
                  <a href = "mailto: info@cr.se">info@cr.se</a>
                  <div className="copyright">
                    <p>Copyright CR Group AB 2024</p>
                  </div>
                </div>
                <div className="footer-contact-content-middle">
                  <p>{postAddressText}</p>
                  <p>CR Group AB</p>
                  <p>Aspövägen 41</p>
                  <p>125 40 Älvsjö</p>
                </div>
                <div className="footer-contact-content-right">
                  <p>
                    {contactContentText1}
                  </p>
                  <p>
                    {contactContentText2}
                  </p>
                  <p>
                    {contactContentText3}
                  </p>
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
