const fcsv = require('fast-csv');
const path = require('path');

module.exports = read;

/**
* Read in a CSV file, and resolve with an array of events
* @param {string} readPath - path to the file to read
* @param {object} opts - Options.
*/
function read(readPath, opts) {
  return new Promise(function(resolve, reject) {
    let resolvedRead = path.resolve(readPath);
    let lessons = [];
    fcsv.fromPath(resolvedRead, opts.fcsv)
      .transform(row => {
        // return a nicely named obj
        return {
          lesson: row.Lecture,
          article: row.Article,
          instructor: row.Instructor,
          team: {
            deck: row['On Deck'],
            support: row.Support,
            out: row.Out
          },
          date: row.Date,
          time: row.Time
        };
      })
      .validate(row => { return byName(row, opts.name); })
      .on('data', row => {
        lessons.push(row);
      })
      .on('end', () => {
        resolve(lessons);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

/**
* Filters each row by an instructor's name.
* @param {object} record - A single record/row from input CSV
* @param {string} name - The instructor name to filter records by
* @return {Boolean}
*/
function byName(record, name) {
  return (record.instructor) ? record.instructor.toLowerCase() === name : false;
}
