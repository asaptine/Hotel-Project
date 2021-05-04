const moment = require('moment');

exports.calculateDaysBetweenDates = function(dates){
    const firstDateString = dates.slice(0, 10);
    let firstMomentObj = moment(firstDateString, 'YYYY-MM-DD');
    const firstDateObj = firstMomentObj.toDate();

    const secondDateString = dates.slice(13, dates.length);
    let secondMomentObj = moment(secondDateString, 'YYYY-MM-DD');
    const secondDateObj = secondMomentObj.toDate();
    
    let secondDate = new Date(secondDateObj);
    let firstDate = new Date(firstDateObj);

    firstDate.setDate(firstDate.getDate()+1);
    secondDate.setDate(secondDate.getDate()+1);

    let daysDiff = parseInt((secondDate - firstDate) / (1000 * 60 * 60 * 24), 10); 
    return daysDiff;
}
