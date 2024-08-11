// dates.js
process.env.TZ = 'Europe/Amsterdam';

function dateToNum(date) {
    return 25569 + (date.getTime() - date.getTimezoneOffset() * 60000) / 86400000;
}

export function msToNum(s) {
    return dateToNum(new Date(parseInt(s)));
}