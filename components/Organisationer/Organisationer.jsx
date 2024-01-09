"use client";
import "./Organisationer.css";
import runSectionTextAnimation from "@animations/animations";
import { useEffect, useState, useRef} from "react";
import { DotLottiePlayer, Controls, PlayerEvents } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);


const Organisationer = () => {
  const lang = "sv";
  const [content, setContent] = useState(null);
 

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}organisationer-contents?locale=${lang}`;
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
  }, []);



 const lottieRef = useRef();


  

  // Setup ScrollTrigger
  useEffect(() => {
    if (!content) return;

    if(lottieRef.current) {
      
     setTimeout(() => {
        ScrollTrigger.create({
          trigger: ".organisationer-content-wrapper-bottom",
          start: "top center",
          onEnter: lottieRef.current.playOnShow(),
        });
      }, 3000);
      
      
    
    }
   
  }, [content, lottieRef]);


  useEffect(() => {
    if (!content) return; // Ensure content is loaded before running the animation
    runSectionTextAnimation(".organisationer-content-wrapper-top h2", ".organisationer-content-wrapper-top p")
  }, [content]);


  if (!content) return <div></div>;
  return (
    <div className="organisationer-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="organisationer-content-wrapper-top">
              <div className="sub-header-wrapper">
                <img src="/prefix-icon.svg" alt="Left" />
                <h6> {content.data[0].attributes.miniHeadline} </h6>
              </div>
              <h2>{content.data[0].attributes.H1}</h2>
              <div>
                <p>{content.data[0].attributes.Text}</p>
              </div>
            </div>

            <div className="organisationer-content-wrapper-bottom">
                <DotLottiePlayer
                  lottieRef={lottieRef}
                  src="/organisationer-5-sek.lottie"
                  height={550}
                  id="player"
                >
                </DotLottiePlayer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisationer;
