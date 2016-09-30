const fcsv = require('fast-csv');
const path = require('path');

module.exports = write;

/**
** Write the events to writePath.csv
** @param {array} lessons - An array of lesson events.
** @param {string} writePath - The path the file will be written to.
*/
function write(lessons, writePath) {
  return new Promise(function(resolve, reject) {
    let resolvedWrite = path.resolve(writePath);

    fcsv.writeToPath(resolvedWrite, lessons, { headers: true })
      .on('finish', () => {
        console.log(`${lessons.length} events written to:\n\t${resolvedWrite}`);
        resolve({
          lessons,
          path: resolvedWrite
        });
      })
      .on('error', err => reject(err));
  });
}
