const parser = require('fast-csv');

module.exports = read;

/**
** Read in a CSV file, and resolve with an array of events
 */
function read(filename, opts) {
  return new Promise(function(resolve, reject) {
    let lessons = [];
    parser.fromPath(filename, opts.fcsv)
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
** Filters each row by an instructor's name.
** @return {Boolean}
 */
function byName(row, name) {
  return (row.instructor) ? row.instructor.toLowerCase() === name : false;
}
