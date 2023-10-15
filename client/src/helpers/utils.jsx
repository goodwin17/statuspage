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

const getCookie = (name) => {
    console.log(document.cookie);
    let cookie = document.cookie.split('; ').find(item => item.startsWith(`${name}=`));
    console.log(cookie);

    if (!cookie) {
        return null;
    }

    console.log("there is cookie");
    
    let cookieValue = cookie.split('=')[1];
    return cookieValue;
}

export {
    parseInterval,
    getCookie
};
