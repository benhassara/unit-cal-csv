const read = require('./lib/read');
const gcal = require('./lib/fmt-gcal');
const write = require('./lib/write');

const opts = {
  fcsv: {
    headers: true,
    ignoreEmpty: true,
    discardUnmappedColumns: true
  },
  name: 'ben',
  writePath: 'gcal-unit2.csv',
  readPath: 'g30-Schedule-Unit-2.csv'
};

read('g30-Schedule-Unit-2.csv', opts)
.then((lessons) => {
  return gcal(lessons);
})
.then((lessons) => { write(lessons, opts.writePath); })
.catch((error) => {
  console.log(error);
});
