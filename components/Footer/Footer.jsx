import "./Footer.css";

const Footer = () => {
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
                  <p style={{ fontWeight: 700 }}>Besöksadress</p>

                  <p>CR Group AB</p>
                  <p>Hovslagargatan 5b</p>
                  <p>Blaseholmen, Stockholm</p>
                  <p>+46 8 551 102 40</p>
                  <p>info@cr.se</p>
                  <div className="copyright">
                    <p>Copyright CR Group AB 2024</p>
                  </div>
                </div>
                <div className="footer-contact-content-middle">
                  <p>Postadress</p>
                  <p>CR Group AB</p>
                  <p>Aspövägen 41</p>
                  <p>125 40 Älvsjö</p>
                </div>
                <div className="footer-contact-content-right">
                  <p>
                    CR Group är ett svenskt cybersäkerhetsföretag som utvecklar
                    paketerade och användarvänliga digitala lösningar för
                    samhällsviktig verksamhet.
                  </p>
                  <p>
                    Kunderna utgörs av försvar, myndigheter och näringsliv i
                    Sverige och Europa.
                  </p>
                  <p>
                    Huvudägare är Formica Capital I AB. VD är Björn Weigel.
                    Styrelseordförande är Nicklas Storåkers.
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
