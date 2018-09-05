const colors = require('colors');


const util = {
  log(msg, type) {
    const time = colors.gray(`[${this.formatTime()}] `);
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }
    if (type && typeof type === 'string') {
      type = type.toUpperCase();
      if (type === 'ERROR') {
        console.error(colors.red(`[ERROR]: ${msg}`))
      } else if (type === 'WARNING') {
        console.error(colors.yellow(`[WARNING]: ${msg}`))
      } else {
        const fn = colors[type] ? colors[type] : colors['info'];
        console.log(`${time} ${fn(`[${type}]`)} ${msg}`);
      }
    }
  },
  formatTime(format = 'HH:mm:ss', date = new Date()) {
    if (date && typeof date === 'string') {
      date = new Date(date);
    }

    const zeroPre = n => (`0${n}`).slice(-2);

    const formats = {
      YYYY: date.getFullYear(),
      MM: zeroPre(date.getMonth() + 1),
      DD: zeroPre(date.getDate()),
      HH: zeroPre(date.getHours()),
      mm: zeroPre(date.getMinutes()),
      ss: zeroPre(date.getSeconds())
    }
    return format.replace(/([a-z])\1+/gi, (m) => {
      return formats[m] || m
    })
  }
}

module.exports = util;
