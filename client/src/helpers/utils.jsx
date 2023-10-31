const parseInterval = (interval) => {
    let minutes = null;
    let seconds = null;
    
    if (interval >= 60) {
        minutes =  Math.floor(interval / 60);
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

function calculateOverallUptime(uptimeData) {
    let last7Days = uptimeData.slice(-7).reduce((sum, el) => sum + el.value, 0) / 7;
    let last30Days = uptimeData.slice(-30).reduce((sum, el) => sum + el.value, 0) / 30;
    let last60Days = uptimeData.reduce((sum, el) => sum + el.value, 0) / 60;
    let items = [{
        capture: 'Last 24 hours',
        value: uptimeData[0]?.value ?? 0
    }, {
        capture: 'Last 7 days',
        value: last7Days
    }, {
        capture: 'Last 30 days',
        value: last30Days
    }, {
        capture: 'Last 60 days',
        value: last60Days
    }];

    return items;
}

async function sleep(ms) {
    return await new Promise(r => setTimeout(r, ms));
}

function isObject(value) {
    return (typeof value === 'object' && !Array.isArray(value) && value !== null);
}

function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getCheckDescription(checkInterval, checkMethod) {
    const [minutes, seconds] = parseInterval(checkInterval);
    let intervalPart = `Being checked every `;
    
    if (minutes) {
        let s = minutes > 1 ? 's' : '';
        intervalPart += `${minutes} minute${s}`;

        if (seconds) {
            intervalPart += ' and ';
        }
    }
    
    if (seconds) {
        let s = seconds > 1 ? 's' : '';
        intervalPart += `${seconds} second${s}`;
    }

    return <>{intervalPart} by <strong>{checkMethod.toUpperCase()}</strong> method</>;
}

export {
    parseInterval,
    getCookie,
    calculateOverallUptime,
    sleep,
    isObject,
    hasProp,
    getCheckDescription,
};
