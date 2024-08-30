const util = require('util');

function customLog(format, ...args) {
  const message = util.format(format, ...args);
  process.stdout.write(message + '\n');
}

module.exports = customLog;
