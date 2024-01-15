"use client";
import "./Kontakt.css";
import { useEffect, useState } from "react";

const Kontakt = (props) => {
  const lang = props.lang;
  const [contacts, setContacts] = useState(null);
  const contactText = lang === "sv" ? "Kontakt" : "Contact";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}employees?pagination[limit]=4&populate=*&locale=${lang}`;
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (response.ok) {
          const contacts = await response.json();

          setContacts(contacts.data);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchData();
  }, []);

  if (!contacts) return <div></div>;

  return (
    <div className="kontakt-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="kontakt-content-wrapper">
              <div className="kontakt-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {contactText} </h6>
              </div>
              <div className="kontakt-grid-wrapper">
                {contacts.map((contact, index) => (
                  <div key={index} className="kontakt-item">
                    <div className="kontakt-item-top">
                      <img
                        className="contact-image"
                        src={`${process.env.NEXT_PUBLIC_API_SLIM}${contact.attributes.Image.data.attributes.formats.large.url}`}
                      />
                    </div>
                    <div className="kontakt-item-bottom">
                      <div>
                        <h3>{contact.attributes.Name}</h3>
                        <h4>{contact.attributes.Title}</h4>
                      </div>
                      <p>
                        <a href={`mailto:${contact.attributes.Email}`}>
                          {contact.attributes.Email}
                        </a>
                      </p>
                      <p>
                        <a href={`tel:${contact.attributes.Phone}`}>
                          {contact.attributes.Phone}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
