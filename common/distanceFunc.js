export const distanceFunc = (eventCoord, userCoord) => {
    console.log('eventCoordFunc:', eventCoord)
    console.log('userCoordFunc:', userCoord)
    let lat1 = eventCoord.latitude
    let lat2 = userCoord.latitude
    let lon1 = eventCoord.longitude
    let lon2 = userCoord.longitude

    const R=6371;  // Earth's radius
    let sin1=Math.sin((lat1-lat2)/2);
    let sin2=Math.sin((lon1-lon2)/2);
    return 2 * R * Math.asin(Math.sqrt(sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2)))
}
