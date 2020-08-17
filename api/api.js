import * as axios from "axios";

export let getCurUsD = (currentUserId, currentUsername) => {
        return  axios.post(`http://185.12.95.84:3000/userdialoglist`, {currentUserId: currentUserId, currentUsername: currentUsername});
    }

export let getcurDUsers = (dialog_id) => {
    return axios.post(`http://185.12.95.84:3000/curdialogusers`, {dialog_id: dialog_id})
}

export let getUserDialog = (dialog_id) => {
    return axios.post(`http://185.12.95.84:3000/userdialog`, {dialog_id: dialog_id})
}

export let getUserProfileBar = (currentUserId) => {
    return axios.post(`http://185.12.95.84:3000/userprofilebar`, {currentUserId: currentUserId})
}

export let getTown = (lat ,long) => {
    return axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=a2b8af4a-0675-4706-aafc-c386bc1661ee&lang=en_US&format=json&geocode=${long},${lat}`)
}

export const kudaGoAPI = () => {
    let city = 'Москва'
    const allEventsByLocation = (city) => {
        return axios.get(`https://kudago.com/public-api/v1.4/events/?lang=&fields=&expand=&order_by=&text_format=&ids=&location=&actual_since=1444385206&actual_until=1444385405&is_free=&categories=kvn,-magic&lon=&lat=&radius=`)
    }
}

export const userProfileAPI = {
    getUserProfile (user_id) {
        return axios.post(`http://185.12.95.84:3000/getprofile`, {userId: user_id})
    }
}
