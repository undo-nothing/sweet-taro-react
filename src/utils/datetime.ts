import moment from 'moment';

export function strfdate(date: any, format?: string) {
  let strFormat = 'YYYY-MM-DD';
  if (format) {
    strFormat = format;
  }
  return moment(date).format(strFormat);
}

export function strpdate(date?: string) {
  let newDate = moment(date);
  if (!newDate.isValid()) {
    newDate = moment();
  }
  return newDate;
}

export function randomDate(start: any, end: any) {
  const ret_date = moment(start);
  const max = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const randomNumber = Math.floor(Math.random() * (max + 1));
  return ret_date.add(randomNumber, 'day');
}
