const areAnyUndefined = (list) => {
    return list.filter((element) => {
        return element === undefined || element.length === 0
    }).length > 0;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getWeekDay = (index) => {
    return dayNames[index];
}

const getWeekNumber = (currentDate) => {
    const oneJan = new Date(currentDate.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
}


export {
    areAnyUndefined, getWeekDay, getWeekNumber
}
