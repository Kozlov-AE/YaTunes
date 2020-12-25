//Подключаем модули js
import { musicPlayerInit } from './musicPlayer.js'
import { radioPlayerInit } from './radioPlayer.js'
import { videoPlayerInit } from './videoPlayer.js'

//Определяем модули страницы в js коде
const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//Деактивируем вкладки плееров и убираем сами плееры
const DeactiveBlock = () => {
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
}

//Перемещение по вкладкам плееров
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayers();
    //temp.style.display = 'none'//Скрываем название сайта при активации вкладок
    //DeactiveBlock();//Деактивируем все вкладки
    btn.classList.add('active');//Активируем выбранную вкладку
    playerBlock[i].classList.add('active');//Активируем требуемый плеер
}));

const deactivationPlayers = () => {
    temp.style.display = 'none';
    DeactiveBlock();
    musicPlayerInit.stop();
    radioPlayerInit.stop();
    videoPlayerInit.stop();
}

musicPlayerInit();
radioPlayerInit();
videoPlayerInit();