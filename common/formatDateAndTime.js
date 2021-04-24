export const formatDateAndTime = (data) => {

    let dd = data.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = data.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = data.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    let hh = data.getHours();

    let min = data.getMinutes();

    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;
}
