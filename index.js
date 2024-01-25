import moment from 'moment';

// 2024-01-13 14:19:00 is a moon zenith, as reported by https://www.timeanddate.com/moon/usa/new-york
// so 12 hours 24 minutes and 12 seconds before that is a moon midnight.
let knownMoonMidnight = moment('2024-01-13 01:55:00-05:00');

// This is a time when the moon is at its lowest.
let knownMoonOrbitStart = moment('2024-01-10 11:17:00-05:00');

const getMoonMidnightForTimeInNyc = timeInNyc => {
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
  return localMoonMidnight;
}

/**
 * Convert a moment time in NYC to a time in NYC moontime.
 * @param {Moment} timeInNyc
 */
const timeInNycToMoontime = (timeInNyc, options = {displaySeconds: true}) => {
  const localMoonMidnight = getMoonMidnightForTimeInNyc(timeInNyc);
  const solarSeconds = moment.duration(
    timeInNyc.diff(localMoonMidnight)
    ).asSeconds();
  // 89428 solar seconds should equal 86400 moon seconds.
  let moonSeconds = Math.floor(solarSeconds * (86400/89428));
  let moonHours = Math.floor(moonSeconds / 60 / 60);
  moonSeconds -= moonHours * 60 * 60;
  const moonMinutes = Math.floor(moonSeconds / 60);
  moonSeconds -= moonMinutes * 60;

  let amOrPm = 'am';
  if (moonHours >= 12) {

    amOrPm = 'pm';
    if (moonHours > 12) {
      moonHours -= 12;
    }
  }

  let moontimeFormatted = String(moonHours)
    + ':' + String(moonMinutes).padStart(2, '0');
  if (options.displaySeconds) {
    moontimeFormatted += ':' + String(moonSeconds).padStart(2, '0');
  }
  moontimeFormatted += ' ' + amOrPm;
  return moontimeFormatted;
}

const getMoonriseOffsetInMinutes = timeInNyc => {
  // Clone object so the argument is not modified.
  let localMoonOrbitStart = moment(knownMoonOrbitStart);
  // Find the moon lowpoint of the orbit that conatins
  // the provided timeInNyc.
  while (true) {
    if (localMoonOrbitStart.isBefore(timeInNyc)) {
      // Offset one lunar orbit.
      localMoonOrbitStart
        .add(24 * 27
          + 24 * 0.321662, 'hours');
    } else {
      localMoonOrbitStart
        .subtract(24 * 27 + 24 * 0.321662, 'hours');
      break;
    }
  }
  const daysFromBeginningOfRotation = Math.floor(moment.duration(
    timeInNyc.diff(localMoonOrbitStart)
  ).asDays());
  switch (daysFromBeginningOfRotation) {
    case 0:
      return 7 * 60 + 39;
    case 1:
      return 7 * 60 + 37;
    case 2:
      return 7 * 60 + 16;
    case 3:
      return 6 * 60 + 56;
    case 4:
      return 6 * 60 + 33;
    case 5:
      return 6 * 60 + 7;
    case 6:
      return 5 * 60 + 43;
    case 7:
      return 5 * 60 + 20;
    case 8:
      return 4 * 60 + 55;
    case 9:
      return 4 * 60 + 34;
    case 10:
      return 4 * 60 + 15;
    case 11:
      return 4 * 60 + 60;
    case 12:
      return 3 * 60 + 52;
    case 13:
      return 3 * 60 + 54;
    case 14:
      return 4 * 60 + 4;
    case 15:
      return 4 * 60 + 20;
    case 16:
      return 4 * 60 + 39;
    case 17:
      return 4 * 60 + 59;
    case 18:
      return 5 * 60 + 20;
    case 19:
      return 5 * 60 + 41;
    case 20:
      return 6 * 60 + 1;
    case 21:
      return 6 * 60 + 22;
    case 22:
      return 6 * 60 + 42;
    case 23:
      return 7 * 60 + 2;
    case 24:
      return 7 * 60 + 19;
    case 25:
      return 7 * 60 + 33;
    case 26:
      return 7 * 60 + 41;
    case 27:
      return 7 * 60 + 41;
  }
}

const nextMoonriseInNycTime = timeInNyc => {
  let localMoonMidnight = getMoonMidnightForTimeInNyc(timeInNyc);
  let moonriseOffset = getMoonriseOffsetInMinutes(timeInNyc);
  let moonrise = moment(localMoonMidnight);
  moonrise.add(
    moonriseOffset, 'minutes'
  );
  if (moonrise.isBefore(timeInNyc)) {
    localMoonMidnight.add(24, 'hours')
        .add(50, 'minutes')
        .add(28, 'seconds');
    let timeInNycTomorrow = moment(timeInNyc);
    timeInNycTomorrow.add(24, 'hours')
      .add(50, 'minutes')
      .add(28, 'seconds');
    moonriseOffset = getMoonriseOffsetInMinutes(timeInNycTomorrow);
    moonrise = moment(localMoonMidnight);
    moonrise.add(
      moonriseOffset, 'minutes'
    );
  }
  return moonrise;
}

const nextMoonsetInNycTime = timeInNyc => {
  let localMoonMidnight = getMoonMidnightForTimeInNyc(timeInNyc);
  localMoonMidnight.add(24, 'hours')
        .add(50, 'minutes')
        .add(28, 'seconds');
  let moonsetOffset = getMoonriseOffsetInMinutes(timeInNyc);
  let moonset = moment(localMoonMidnight);
  moonset.subtract(
    moonsetOffset, 'minutes'
  );
  if (moonset.isBefore(timeInNyc)) {
    localMoonMidnight.add(24, 'hours')
        .add(50, 'minutes')
        .add(28, 'seconds');
    let timeInNycTomorrow = moment(timeInNyc);
    timeInNycTomorrow.add(24, 'hours')
      .add(50, 'minutes')
      .add(28, 'seconds');
    moonsetOffset = getMoonriseOffsetInMinutes(timeInNycTomorrow);
    moonset = moment(localMoonMidnight);
    moonset.subtract(
      moonsetOffset, 'minutes'
    );
  }
  return moonset;
}

export {
  timeInNycToMoontime,
  nextMoonriseInNycTime,
  nextMoonsetInNycTime
};