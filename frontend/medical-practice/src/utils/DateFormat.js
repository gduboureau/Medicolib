import moment from 'moment';

const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}/${month}/${year}`;
}

const formatTime = (timeString) => {
    const time = moment(timeString, 'HH:mm:ss');
    return time.format('HH:mm');
  };

export const format = {formatDate, formatTime};