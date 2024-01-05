"use client";
import "./Kontakt.css";
import { useEffect, useState } from "react";

const Kontakt = () => {
  const lang = "sv";
  const [contacts, setContacts] = useState(null);

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

  if (!contacts) return <div>Loading...</div>;

  return (
    <div className="kontakt-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="kontakt-content-wrapper">
              <div className="kontakt-text-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> Kontakt </h6>
              </div>
              <div className="kontakt-grid-wrapper">
                {contacts.map((contact, index) => (
                  <div key={index} className="kontakt-item">
                    <div className="kontakt-item-top">
                      <img src="/employeeman.png" alt="Kontakt" />
                    </div>
                    <div className="kontakt-item-bottom">
                      <h3>{contact.attributes.Name}</h3>
                      <h4>{contact.attributes.Title}</h4>
                      <p>{contact.attributes.Email}</p>
                      <p>{contact.attributes.Phone}</p>
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
