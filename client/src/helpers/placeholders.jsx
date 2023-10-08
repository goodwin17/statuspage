// variables

const incidents = [{
    id: 1,
    type: 'up',
    title: "Running again",
    reason: "Some reason",
    datetime: "some date"
}, {
    id: 2,
    type: 'down',
    title: "Down right now",
    reason: "Some reason",
    datetime: "some date"
}];

const overallUptime = [{
    capture: 'Last day',
    value: '99%',
}, {
    capture: 'Last 7 days',
    value: '98.23%'
}, {
    capture: 'Last 30 days',
    value: '97.456%'
},];

const service = {
    name: 'Example website',
    address: 'https://example.com',
    checkMethod: 'http',
    checkInterval: 70,
    monitoringStatus: 1
};


// functions

function parseInterval(interval) {
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

export {
    incidents,
    overallUptime,
    service,
    parseInterval
}
