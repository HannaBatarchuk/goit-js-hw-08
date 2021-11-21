
import Player from "@vimeo/player";
import { throttle } from "lodash";
const iframe = document.querySelector("iframe");
const player = new Player(iframe);
const LOCALPLAYER_KEY = "videoplayer-current-time";

player.setCurrentTime(localStorage.getItem(LOCALPLAYER_KEY)).then(function(seconds) {
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
console.log(localStorage.getItem(LOCALPLAYER_KEY));

player.on("play", function () {
  console.log("played the video!");
});

player.getVideoTitle().then(function (title) {
  console.log("title:", title);
});

const onPlay = function (data) {
    localStorage.setItem(LOCALPLAYER_KEY, data.seconds);
    console.log(data.seconds);
}
player.on('timeupdate', throttle(onPlay, 1000));