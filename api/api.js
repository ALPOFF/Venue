import * as axios from "axios";

export let getCurUsD = (currentUserId) => {
        return  axios.post(`https://warm-ravine-29007.herokuapp.com/userdialoglist`, {currentUserId: currentUserId});
    }

export let getcurDUsers = (dialog_id) => {
    return axios.post(`https://warm-ravine-29007.herokuapp.com/curdialogusers`, {dialog_id: dialog_id})
}

export let getUserDialog = (dialog_id) => {
    return axios.post(`https://warm-ravine-29007.herokuapp.com/userdialog`, {dialog_id: dialog_id})
}

export const kudaGoAPI = () => {
    let city = 'Москва'
    const allEventsByLocation = (city) => {
        return axios.get(`https://kudago.com/public-api/v1.4/events/?lang=&fields=&expand=&order_by=&text_format=&ids=&location=&actual_since=1444385206&actual_until=1444385405&is_free=&categories=kvn,-magic&lon=&lat=&radius=`)
    }
}
