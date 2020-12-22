export const videoPlayerInit = () => {
    //Определяем контролы с вкладки плеера
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');

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


    //#region Подписки на события

    //Клик по кнопке play
    videoButtonPlay.addEventListener('click', togglePlay);
    //Клик по самому плееру
    videoPlayer.addEventListener('click', togglePlay);
    //Обработка события начала воспроизведения плеером
    videoPlayer.addEventListener('play', toggleIcon);
    //Обработка события остановки воспроизведения
    videoPlayer.addEventListener('pause', toggleIcon);
    //Клик по кнопке Стоп
    videoButtonStop.addEventListener('click', stopPlay);
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

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });
    //#endregion

}