"use client";

import "@dotlottie/player-component";
import { PlaybackOptions } from "@dotlottie/player-component";


const playbackOptions = {
  autoplay: true,
  defaultTheme: "light",
  direction: 1,
  hover: true,
  intermission: true,
  loop: true,
  playMode: "normal",
  speed: 1,
};
export default function Player(src, playbackOptions, controls) {
  return (
    <div>
      <dotlottie-player
        src={props.src}
        autoplay={props.playbackOptions?.autoplay}
        defaultTheme={props.playbackOptions?.defaultTheme}
        direction={props.playbackOptions?.direction}
        hover={props.playbackOptions?.hover}
        intermission={props.playbackOptions?.intermission}
        loop={props.playbackOptions?.loop}
        playMode={props.playbackOptions?.playMode}
        speed={props.playbackOptions?.speed}
        controls={props.controls}
      ></dotlottie-player>
    </div>
  );
}
