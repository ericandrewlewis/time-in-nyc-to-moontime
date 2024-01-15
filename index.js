import moment from 'moment';

// 2024-01-13 14:19:00 is a moon zenith, as reported by https://www.timeanddate.com/moon/usa/new-york
// so 12 hours 24 minutes and 12 seconds before that is a moon midnight.
let knownMoonMidnight = moment('2024-01-13 01:55:00-05:00')

/**
 * Convert a moment time in NYC to a time in NYC moontime.
 * @param {Moment} timeInNyc
 */
const timeInNycToMoontime = timeInNyc => {
  // Clone object so the argument is not modified.
  let localMoonMidnight = moment(knownMoonMidnight);
  // Find the moon midnight of the day that conatins the provided
  // timeInNyc.
  while (true) {
    if (localMoonMidnight.isBefore(timeInNyc)) {
      // timeInNyc.add(24, 'hours')
      // .add(50, 'minutes')
      // .add(28, 'seconds');
      localMoonMidnight.add(24, 'hours')
      .add(50, 'minutes')
      .add(28, 'seconds');
    } else {
      localMoonMidnight.subtract(24, 'hours')
        .subtract(50, 'minutes')
        .subtract(28, 'seconds');
      break;
    }
  }
  const solarSeconds = moment.duration(
    timeInNyc.diff(localMoonMidnight)
    ).asSeconds();
  // 89428 solar seconds should equal 86400 moon seconds.
  let moonSeconds = Math.floor(solarSeconds * (86400/89428));
  const moonHours = Math.floor(moonSeconds / 60 / 60);
  moonSeconds -= moonHours * 60 * 60;
  const moonMinutes = Math.floor(moonSeconds / 60);
  moonSeconds -= moonMinutes * 60;

  const moontimeFormatted = String(moonHours).padStart(2, '0')
    + ':' + String(moonMinutes).padStart(2, '0')
    + ':' + String(moonSeconds).padStart(2, '0')
  return moontimeFormatted;
}

export default timeInNycToMoontime;