export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioNavigation = document.querySelector('.radio-navigation')
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeader = document.querySelector('.radio-header');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

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

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = 

        audio.src = target.dataset.radioStantion;
        audio.play();
        radioStop.disabled = false;
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })

}