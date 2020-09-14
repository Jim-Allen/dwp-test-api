//Function to convert decimal degrees to radians
const degToRad = (degrees) => degrees * (Math.PI / 180)

//Function to convert radians to decimal degrees
const radToDeg = (radians) => radians / (Math.PI / 180)

//Function to calculate distance between two locations expressed in latitude and longitude
const milesFromOrigin = (lat1, lon1, lat2, lon2) => {

    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0
    }
    else {
        //1 degree = (PI/180) radians
        let theta = lon1-lon2
        let dist = Math.sin(degToRad(lat1)) * Math.sin(degToRad(lat2)) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.cos(degToRad(theta))
        dist = Math.acos(dist)
        dist = radToDeg(dist)
        dist = dist * 60 * 1.1515
        return dist
    }
}

module.exports = milesFromOrigin