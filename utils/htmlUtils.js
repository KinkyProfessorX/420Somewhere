const _ = require('lodash')

const makeList = (items) => {
  const itemsUniq = _.uniq(items)

  if(items.length > 1) {
    itemsUniq[itemsUniq.length -1] = `and ${itemsUniq[itemsUniq.length -1]}`
  }

  return itemsUniq.length > 2? itemsUniq.join(', ') : itemsUniq.join(' ')
}

const makeUL = (array) => `<ul>${_.join(_.map(array, (item) => `<li>${item}</li>`), '')}</ul>`

const makeStyle = (styles) => `style="${_.join(_.map(Object.keys(styles), (key) => `${key}:${styles[key]};`), '')}"`

const intervalFunction = () => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('timer').innerHTML = `${minutes}m ${seconds}s `;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById('blaze').innerHTML = 'Blaze!';
    document.getElementById('refresh').style.display = 'block';
  }
}

const makeTimer = (targetDate) => {
  return `
  <!-- Display the countdown timer in an element -->
    <div id="timer"></div>
    <div id="blaze"></div>
    <div id="refresh" ${makeStyle({display: 'none'})}>
      <button onClick="window.location.reload();">
        Who's ligting up next?
      </button>
    </div>
    <script>
    // Set the date we're counting down to
    const countDownDate = new Date(${targetDate}).getTime();

    const x = setInterval(${intervalFunction})

    </script>
  `
}
module.exports = {
  makeList,
  makeUL,
  makeStyle,
  makeTimer
}