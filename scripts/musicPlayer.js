import { getNormalTime } from './timeConverter.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioPlayer = document.querySelector('.audio-player');
    const audioHeader = document.querySelector('.audio-header');
    const audioCover = document.querySelector('.audio-img');
    const audioButtonPrev = document.querySelector('.audio-button__prev');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonNext = document.querySelector('.audio-button__next');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioProgress = document.querySelector('.audio-progress');
    

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    //Смена иконки плэй/пауза
    const togglePlayButton = () => {
        if (audioPlayer.paused){
            audioButtonPlay.classList.add('fa-play');
            audioButtonPlay.classList.remove('fa-pause');
        } else {
            audioButtonPlay.classList.remove('fa-play');
            audioButtonPlay.classList.add('fa-pause');
        }
    }

    //Метод запуска / паузы воспроизведения музыки
    const audioPlayerPlayPauseMethod = () => {
        if(audioPlayer.paused){
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }

    //Метод перехода на предыдущий трек
    const audioPlayerPrevMethod = () => {
        if(trackIndex !== 0){
            trackIndex--;
        } else{
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }
    
    //Метод перехода на следующий трек
    const audioPlayerNextMethod = () => {
        if(trackIndex === playlist.length - 1 ){
            trackIndex = 0;
        } else{
            trackIndex++;
        }
        loadTrack();
    }

    //Загрузка трека в плеер
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        let currentTrack = playlist[trackIndex];
        audioPlayer.src = `./audio/${currentTrack}.mp3`;

        if(isPlayed){
            audioPlayer.pause();
        }else{
            audioPlayer.play();
        }
    }

    //Смена заголовка и обложки трека
    const toggleHeaderAndCover = () => {
        console.log('toggleHeaderAndCover');
        let currentTrack = playlist[trackIndex];

        
        if(audioPlayer.paused){
            audio.classList.remove('play');
        } else {
            audio.classList.add('play');
        }
        audioCover.src = `./audio/${currentTrack}.jpg`;
        audioHeader.textContent = currentTrack.toUpperCase();
    }

    audioPlayer.addEventListener('ended', () => {
        audioPlayerNextMethod();
        audioPlayerPlayPauseMethod();
    });
    
    //Событие старта проигрывания плеера
    audioPlayer.addEventListener('play', () => {
        togglePlayButton();
        toggleHeaderAndCover();
    });
    
    //Событие остановки проигрывания плеера
    audioPlayer.addEventListener('pause', () => {
        togglePlayButton();
        toggleHeaderAndCover();
    });

    audioNavigation.addEventListener('click', event => {
        if(event.target.classList.contains('audio-button__play')){
            audioPlayerPlayPauseMethod();
        }
        if(event.target.classList.contains('audio-button__next')){
            audioPlayerNextMethod();
            toggleHeaderAndCover();
        }
        if(event.target.classList.contains('audio-button__prev')){
            audioPlayerPrevMethod();
            toggleHeaderAndCover();
        }
     });

     audioPlayer.addEventListener('timeupdate', () => {
         const duration = audioPlayer.duration;
         const currentTime = audioPlayer.currentTime;
         const progress = (currentTime / duration) * 100;

         audioProgressTiming.style.width = progress + '%';

         audioTimePassed.textContent = getNormalTime(currentTime);
         audioTimeTotal.textContent = getNormalTime(duration);
     });

     audioProgress.addEventListener('click', event => {
        let x = event.offsetX;
        let allWidth = audioProgress.clientWidth;
        let progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
     });

     musicPlayerInit.stop = () => {
        audioPlayer.pause();
     }


}