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
    capture: 'Last day',
    value: '99%',
}, {
    capture: 'Last 7 days',
    value: '98.23%'
}, {
    capture: 'Last 30 days',
    value: '97.456%'
},];

let service = {
    name: 'Example website',
    address: 'https://example.com',
    checkMethod: 'http',
    checkInterval: 70,
    monitoringStatus: 1
};

export {
    incidents,
    overallUptime,
    service
};