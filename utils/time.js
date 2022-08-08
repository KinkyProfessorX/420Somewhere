const _ = require('lodash')
const { getTimeZones } = require('@vvo/tzdb');
const {
  ONE_DAY_OF_MINUTES,
  SOMEWHERE_MINUTES,
  SOMEWHERE_TIME_MINUTES,
} = require('./constants');

const findNextTimeZones = () => {
  const date = new Date()
  const utcHour = date.getUTCHours()
  const utcMinutes = date.getUTCMinutes()
  const minSinceMidnight = (utcHour * 60) + utcMinutes

  /* Offset between midnight UTC and the desired hour */
  const closestOffsetMinutes = SOMEWHERE_TIME_MINUTES - minSinceMidnight
  const offsetMinusDay = closestOffsetMinutes - ONE_DAY_OF_MINUTES

  const timezones = getTimeZones()
  
  const zonesEast = _.filter(timezones, (zone) => zone.currentTimeOffsetInMinutes - closestOffsetMinutes <= 0)
  const zonesWest = _.filter(timezones, (zone) => zone.currentTimeOffsetInMinutes - offsetMinusDay <= 0)

  const foundNextZoneEast = _.minBy(zonesEast, (zone) =>  closestOffsetMinutes - zone.currentTimeOffsetInMinutes)
  const foundOffsetEast = _.get(foundNextZoneEast, 'currentTimeOffsetInMinutes')

  const foundNextZoneWest = _.minBy(zonesWest, (zone) => offsetMinusDay - zone.currentTimeOffsetInMinutes)
  const foundOffsetWest = _.get(foundNextZoneWest, 'currentTimeOffsetInMinutes')

  const bestEastDiff = foundOffsetEast && closestOffsetMinutes - foundOffsetEast 
  const bestWestDiff = foundOffsetWest && offsetMinusDay - foundOffsetWest 

  if(bestEastDiff === bestWestDiff) {
    return _.filter(timezones, (timezone) => {
      return timezone.currentTimeOffsetInMinutes === foundOffsetEast 
      || timezone.currentTimeOffsetInMinutes === foundOffsetWest
    })
  }

  if(bestWestDiff === undefined || bestEastDiff < bestWestDiff) {
    return _.filter(timezones, (timezone) => timezone.currentTimeOffsetInMinutes === foundOffsetEast)
  }

  return _.filter(timezones, (timezone) => timezone.currentTimeOffsetInMinutes === foundOffsetWest)
}

const getCountdownDate = (upcomingZones) => {
  const date = new Date()
  const utcMinutes = date.getUTCMinutes()

  const minutesOffset = upcomingZones[0].currentTimeOffsetInMinutes % 60
  const secondsLeft = 60 - date.getUTCSeconds()
  const minutesInZone = (utcMinutes + minutesOffset) % 60
  const minutesTillSomewhereMinutes = ((SOMEWHERE_MINUTES + 60) - minutesInZone) % 60
  const millisecondsLeft = ((minutesTillSomewhereMinutes * 60) + secondsLeft) * 1000
  return new Date().getTime() + millisecondsLeft
}



module.exports = {
  findNextTimeZones,
  getCountdownDate
}