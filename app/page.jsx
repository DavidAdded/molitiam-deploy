"use client";
import LandingSection from "@components/LandingSection/LandingSection";
import OmOss from "@components/OmOss/OmOss";
import Syfte from "@components/Syfte/Syfte";
import Tjanster from "@components/Tjanster/Tjanster";
import Nationer from "@components/Nationer/Nationer";
import Organisationer from "@components/Organisationer/Organisationer";
import Verksamheter from "@components/Verksamheter/Verksamheter";
import Nyheter from "@components/Nyheter/Nyheter";
import Jobb from "@components/Jobb/Jobb";
import Kontakt from "@components/Kontakt/Kontakt";
import { useEffect, useState } from "react";

const Home = () => {
  const lang = "sv";
  const urlPoints = {
    syfte: lang === "sv" ? "syfte" : "purpose",
    omoss: lang === "sv" ? "omoss" : "aboutus",
    tjanster: lang === "sv" ? "tjanster" : "services",
    nyheter: lang === "sv" ? "nyheter" : "news",
    verksamheter: lang === "sv" ? "verksamheter" : "operations",
    jobb: lang === "sv" ? "jobb" : "jobs",
    kontakt: lang === "sv" ? "kontakt" : "contact",
    nationer: lang === "sv" ? "nationer" : "nations",
    organisationer: lang === "sv" ? "organisationer" : "organisations",
  };
  
  const [content, setContent] = useState(null);
  useEffect(()=> {
 const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}landing-contents?locale=${lang}`;
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Replace 'Hello' with the actual token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContent(data);
          // Set content state here
        } else {
          console.error("Failed to fetch content");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  },[])

  if (!content) return <div></div>

  return (
    <div>
      <LandingSection lang={"sv"} content={content}/>
      <div id={urlPoints.syfte}>
        <Syfte lang={"sv"}/>
      </div>
      <div id={urlPoints.omoss}>
        <OmOss lang={"sv"}/>
      </div>
      <div id={urlPoints.tjanster}>
        <Tjanster lang={"sv"}/>
      </div>
      <div id={urlPoints.nationer}>
        <Nationer lang={"sv"}/>
      </div>
      <div id={urlPoints.organisationer}>
        <Organisationer lang={"sv"}/>
      </div>
      <div id={urlPoints.verksamheter}>
        <Verksamheter lang={"sv"} />
      </div>
      <div id={urlPoints.nyheter}>
        <Nyheter lang={"sv"} />
      </div>
      <div id={urlPoints.jobb}>
        <Jobb lang={"sv"}/>
      </div>
      <div id={urlPoints.kontakt}>
        <Kontakt lang={"sv"}/>
      </div>
    </div>
  );
};



export default Home;
