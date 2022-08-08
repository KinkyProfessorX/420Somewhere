const {SOMEWHERE_MINUTES, SOMEWHERE_HOUR, SOMEWHERE_TIME_ENGLISH} = require('../utils/constants');
const _ = require('lodash')
const {makeList, makeUL, makeStyle, makeTimer} = require('../utils/htmlUtils');
const {findNextTimeZones, getCountdownDate} = require('../utils/time');

const indexPage = () => {
  const upcomingZones = findNextTimeZones()

  const cities = _.flatten(_.map(upcomingZones, (zone) => _.map(zone.mainCities, (city) => `${city}, ${zone.countryName}`)))
  const randomCity = cities[Math.floor(Math.random() * cities.length - 1)]
  const cityULHTML = makeUL(cities)

  const continentList = makeList(_.map(upcomingZones, (zone) => zone.continentName))
  
  const zoneList = makeList(_.map(upcomingZones, (zone) => {
    const zoneLink = `https://www.timeanddate.com/time/zones/${zone.abbreviation.toLowerCase()}`
    return `<a href="${zoneLink}" target="_blank">${zone.alternativeName}</a>`
  }))

  const timer = makeTimer(getCountdownDate(upcomingZones))

  return `
    <h1>It's ${SOMEWHERE_TIME_ENGLISH} somewhere!</h1>
    <div
      ${makeStyle({
        'text-align': 'center',
        'padding':'20px',
        'background-color':'#adebad',
        'margin':'20px,0px'
      })}
    >
      <div ${makeStyle({
        'font-weight':'bold',
        'font-size':'4em'
      })}>
        ${timer}
      </div>
      until 
      <span style=${makeStyle({
        'font-weight':'bold',
        'font-size':'2em'
      })}>
        ${SOMEWHERE_HOUR - 12}:${SOMEWHERE_MINUTES}pm
      </span> in
      <h1>${randomCity}</h1>
    </div>
    <div ${makeStyle({
      'margin-top':'20px'
    })}>
      4:20pm is coming up soon in ${zoneList}
    </div>
    <div>
      Here are some cities in ${continentList} lighting up soon:
    </div>
    ${cityULHTML}
 `
}

module.exports = indexPage