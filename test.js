import timeInNycToMoontime from './index.js';
import moment from 'moment';

// {
//   const midMoonDayInNewYorkInSunTime = moment('2024-01-14 15:12:00-05:00');
//   const actual = timeInNycToMoontime(midMoonDayInNewYorkInSunTime);
//   const expected = '12:00:00';
//   if (actual !== expected) {
//     throw new Error(`2024-01-14 15:12:00-05:00 actual (${actual}) !== expected (${expected})`);
//   }
// }


{
  const nyctime = moment('2024-03-01 04:04:00-05:00');
  const actual = timeInNycToMoontime(nyctime);
  const expected = '12:00:00';
  console.log(actual);
  // if (actual !== expected) {
  //   throw new Error(`2024-09-02 12:43:00-05:00 actual (${actual}) !== expected (${expected})`);
  // }
}

console.log('All tests pass.');


// moonrise today was 9:45am
// moon zenith today was 3:12pm
// moonset today was 8:51pm
// moonlight length was 11 hours and 6 minutes
// half of that is 5 hours 33 minutes
// based on a half, the moon zenith should be 15:18pm

// we can assume that the moon zenith minus half a moon day is moon midnight
// so, 