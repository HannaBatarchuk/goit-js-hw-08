import Player from "@vimeo/player";
import { throttle } from "lodash";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);
const LOCALPLAYER_KEY = "videoplayer-current-time";
const lastSavedTime = localStorage.getItem(LOCALPLAYER_KEY);

if (lastSavedTime !== null) {
  const onPlay = function (data) {
    const currentTime = data.seconds;
    localStorage.setItem(LOCALPLAYER_KEY, currentTime);
    console.log("current time of video", currentTime);
}
player.on('timeupdate', throttle(onPlay, 1000));  
}

player.setCurrentTime(lastSavedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
console.log("Last video time-set:", lastSavedTime);

player.on("play", function () {
  console.log("played the video!");
});

player.getVideoTitle().then(function (title) {
  console.log("title:", title);
});

