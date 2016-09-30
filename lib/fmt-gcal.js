module.exports = fmtGCal;
// Reformat the object read from file into Google Calendar format

/**
** Reformats normalized event objects into Google Calendar format.
** @param {array} records - A list of record objects.
*/
function fmtGCal(records) {
  if (records && records.length) {
    return records.map(record => {
      return {
        Subject: record.lesson,
        'Start Date': parseDate(record.date),
        'Start Time': record.time === 'AM' ? '9:00 AM' : '1:00 PM',
        'End Date': parseDate(record.date),
        'End Time': record.time === 'AM' ? '12:00 PM' : '5:00 PM',
        'All Day Event': 'False',
        Description: parseDescription(record),
        Location: '1062 Delaware Street, Denver, CO 80204',
        Private: 'True'
      };
    });
  }
}

function parseDescription(record) {
  let out = [
    record.article.length ? `URL: ${record.article}` : 'None. Please upload!',
    `On Deck: ${record.team.deck}`,
    `Support: ${record.team.support}`,
    `Out: ${record.team.out}`
  ].join(' ');
  return out;
}

function parseDate(dateString) {
  let start = dateString.indexOf(' ') + 1;
  let date = new Date(dateString.substring(start));
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
