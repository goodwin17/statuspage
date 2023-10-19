let incidents = [{
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

let overallUptime = [{
    capture: 'Last 24 hours',
    value: '99%',
}, {
    capture: 'Last 7 days',
    value: '98.23%'
}, {
    capture: 'Last 30 days',
    value: '97.456%',
}, {
    capture: 'Last 60 days',
    value: '99.995%'
}];

let service = {
    name: 'Example website',
    address: 'https://example.com',
    checkMethod: 'http',
    checkInterval: 70,
    monitoringStatus: 1
};

function generateUptimeData(size) {
    let days = [];

    for (let i = 0; i < size; i++) {
        days.push({
            date: `October ${i + 1}, 2023`,
            value: Math.random() > 0.3 ? 100 : Math.round(Math.random() * 49 + 50)
        });
    }

    return days;
}

let uptimeData = generateUptimeData(60);

export {
    incidents,
    overallUptime,
    service,
    uptimeData
};
