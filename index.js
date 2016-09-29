const read = require('./lib/read');
const gcal = require('./lib/fmt-gcal');
const fcsv = require('fast-csv');

const opts = {
  fcsv: {
    headers: true,
    ignoreEmpty: true
  },
  name: 'ben'
};

read('g30-Schedule-Unit-2.csv', opts)
.then(lessons => {
  return gcal(lessons);
})
.then(lessons => {
  fcsv.writeToPath('junk/gcal-unit2.csv', lessons, { headers: true })
    .on('finish', () => { console.log('CSV written.')});
}).catch(error => {
  console.log(error);
});
