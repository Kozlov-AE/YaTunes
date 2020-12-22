export const videoPlayerInit = () =>{

const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoProgress = document.querySelector('.video-progress');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal = document.querySelector('.video-time__total');

videoPlayer.addEventListener('click', () => {
    videoPlayer.play();})







}