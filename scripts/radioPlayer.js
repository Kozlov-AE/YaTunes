export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioNavigation = document.querySelector('.radio-navigation')
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    //подключили аудио плагин браузера
    const audio = new Audio();
    audio.type = 'audio/aac'; //Формат аудио

    //По умолчанию кнопка не активна, нужно выбрать станцию
    radioStop.disabled = true;

    //Замена иконки воспроизведения
    const changeIconPlay = () => {
        if(audio.paused){
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    }

    //Выбор станции
    const selectItem = el => {
        radioItem.forEach(item => item.classList.remove('select'));
        el.classList.add('select');
    }

    //События воспроизведения аудио
    audio.addEventListener('play', changeIconPlay);
    audio.addEventListener('pause', changeIconPlay);

    //Событие выбора станции
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        const title = parrent.querySelector('.radio-name').textContent;
        const img = parrent.querySelector('.radio-img').src;

        radioHeader.textContent = title;
        radioCoverImg.src = img;

        selectItem(parrent);

        audio.src = target.dataset.radioStantion;
        audio.play();
        radioStop.disabled = false;
    });

    //Клик по кнопке плэй
    radioStop.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
    })

}