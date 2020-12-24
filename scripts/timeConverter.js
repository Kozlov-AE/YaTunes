export const getNormalTime = secs => {
    let hours = Math.floor(secs / 600) || '0';
    let minutes = Math.floor(secs / 60) || '0';
    let seconds = Math.floor(secs % 60) || '0';

    hours = hours > 10 ? `${hours}` : `0${hours}`
    minutes = minutes > 10 ? `${minutes}` : `0${minutes}`
    seconds = seconds > 10 ? `${seconds}` : `0${seconds}`

    let result = hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
    return result;
}
