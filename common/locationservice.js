import Geocoder from 'react-native-geocoding';
import Geolocation from "@react-native-community/geolocation";
import * as axios from "axios";

export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            Geolocation.getCurrentPosition(
                (data) => {
                    console.log(data.coords)
                    resolve(data.coords)
                },
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    console.log(addressComponent)
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}
//
// export const geocodeLocationByCoordsYandex = (lat, long) => {
//     return axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=a2b8af4a-0675-4706-aafc-c386bc1661ee&lang=en_US&format=json&geocode=${long},${lat}`)
//         .then((response) => {
//             return  response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine;
//
//         })
//
// }

