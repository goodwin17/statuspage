const parseInterval = (interval) => {
    let minutes = null;
    let seconds = null;
    
    if (interval >= 60) {
        minutes =  ~~(interval / 60);
    }

    if (interval % 60 !== 0) {
        seconds = interval % 60;
    }

    return [minutes, seconds];
}

export { parseInterval };
