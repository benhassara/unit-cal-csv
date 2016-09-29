const read = require('./lib/read-csv');

const opts = {
  fcsv: {
    headers: true,
    ignoreEmpty: true
  },
  name: 'ben'
};

read('g30-Schedule-Unit-2.csv', opts)
.then(lessons => {
  let pretty = JSON.stringify(lessons, null, '\t');
  console.log(pretty);
}).catch(error => {
  console.log(error);
});
