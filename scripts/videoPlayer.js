export const videoPlayerInit = () => {
    //Определяем контролы с вкладки плеера
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoButtonFullscreen = document.querySelector('.video-button__fullscreen');
    const videoIconDown = document.querySelector('.video-icon__down');
    const videoIconUp = document.querySelector('.video-icon__up');

    // Буфер для запоминания звука до изменения
    let oldVolume;

    //Метод смены стиля кнопки
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    //Метод старта/паузы ролика в плеере
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    //Остановка видео и сброс прогресса на начало
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    //Добавление нуля перед цифрой
    const addZero = n => n < 10 ? '0' + n : n;

    //Изменить громкость в видео
    const changeVolume = () => {
        //const valueVolume = videoVolume.value;
        videoPlayer.volume = videoVolume.value / 100;
    }

    //изменить стиль иконок уровня громкости
    const changeVolumeIcons = () => {
        if (videoPlayer.volume == 0 || videoPlayer.muted == true) {
            videoIconDown.classList.remove('fa-volume-down');
            videoIconDown.classList.add('fa-volume-off');
        } else {
            videoIconDown.classList.add('fa-volume-down');
            videoIconDown.classList.remove('fa-volume-off');
        }
    }

//#region Подписки на события

    //Клик по самому плееру
    videoPlayer.addEventListener('click', togglePlay);

    //Обработка события начала воспроизведения плеером
    videoPlayer.addEventListener('play', toggleIcon);

    //Обработка события остановки воспроизведения
    videoPlayer.addEventListener('pause', toggleIcon);

    //Обработка события изменения времени прогресса видео 
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    //Обработка события изменения уровня громкости в видео
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = videoPlayer.volume * 100;
        changeVolumeIcons();
    });

    //Клик по кнопке play
    videoButtonPlay.addEventListener('click', togglePlay);

    //Клик по кнопке Стоп
    videoButtonStop.addEventListener('click', stopPlay);

    //Изменение ползунка звука
    videoVolume.addEventListener('input', changeVolume);

    changeVolume();
    //Изменение ползунка прогресса видео
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    //Нажатие на кнопку развернуть во весь экран
    videoButtonFullscreen.addEventListener('click',
        () => {
            videoPlayer.requestFullscreen();
        });

    //Нажатие на иконку уменьшения звука
    videoIconDown.addEventListener('click', () => {
        if (videoPlayer.muted == true) {
            videoPlayer.muted = false;
        } else {
            videoPlayer.muted = true;
        }
    });

    //Нажатие на иконку увеличения звука
    videoIconUp.addEventListener('click',
        () => {
            if (videoPlayer.volume == 1) {
                videoPlayer.volume = oldVolume;
            } else {
                oldVolume = videoPlayer.volume;
                videoPlayer.volume = 1;
            }
        });

        videoPlayer.addEventListener('fullscreenchange', () => {
            if(document.fullscreen){
                videoPlayer.controls = true;
            } else {
                videoPlayer.controls = false;
            }
        })
    //#endregion

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
     }


}
