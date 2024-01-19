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


// These are all meridians taken from https://www.timeanddate.com/moon/usa/new-york
// const timesToCheck = [
//   '2024-03-01 04:04:00-05:00',
//   '2024-03-02 04:52:00-05:00',
//   '2024-03-03 05:44:00-05:00',
//   '2024-03-04 06:40:00-05:00',
//   '2024-03-05 07:40:00-05:00',
//   '2024-03-06 08:41:00-05:00',
//   '2024-03-07 09:42:00-05:00',
//   '2024-03-08 10:39:00-05:00',
//   '2024-03-09 11:34:00-05:00',
//   '2024-03-10 13:27:00-05:00',
//   '2024-03-11 14:18:00-05:00',
//   '2024-03-12 15:10:00-05:00',
//   '2024-03-13 16:02:00-05:00',
//   '2024-03-14 16:56:00-05:00',
//   '2024-03-15 17:52:00-05:00',
//   '2024-03-16 18:49:00-05:00',
//   '2024-03-17 19:45:00-05:00',
//   '2024-03-18 20:39:00-05:00',
//   '2024-03-19 21:29:00-05:00',
//   '2024-03-20 22:16:00-05:00',
//   '2024-03-21 23:00:00-05:00',
//   '2024-03-22 23:41:00-05:00',
//   '2024-03-24 00:21:00-05:00',
//   '2024-03-25 01:00:00-05:00',
//   '2024-03-26 01:39:00-05:00',
//   '2024-03-27 02:20:00-05:00',
//   '2024-03-28 03:02:00-05:00',
//   '2024-03-29 03:49:00-05:00',
//   '2024-03-30 04:39:00-05:00',
//   '2024-03-31 05:33:00-05:00',
//   '2024-04-01 06:30:00-05:00',
//   '2024-04-02 07:29:00-05:00',
//   '2024-04-03 08:28:00-05:00',
//   '2024-04-04 09:25:00-05:00',
//   '2024-04-05 10:19:00-05:00',
//   '2024-04-06 11:11:00-05:00',
//   '2024-04-07 12:02:00-05:00',
//   '2024-04-08 12:54:00-05:00',
//   '2024-04-09 13:46:00-05:00',
//   '2024-04-10 14:41:00-05:00',
//   '2024-04-11 15:38:00-05:00',
//   '2024-04-12 16:36:00-05:00',
//   '2024-04-13 17:35:00-05:00',
//   '2024-04-14 18:31:00-05:00',
//   '2024-04-15 19:24:00-05:00',
//   '2024-04-16 20:13:00-05:00',
//   '2024-04-17 20:58:00-05:00',
//   '2024-04-18 21:40:00-05:00',
//   '2024-04-19 22:20:00-05:00',
//   '2024-04-20 22:59:00-05:00',
//   '2024-04-21 23:38:00-05:00',
//   '2024-04-23 00:18:00-05:00',
//   '2024-04-24 01:00:00-05:00',
//   '2024-04-25 01:46:00-05:00',
//   '2024-04-26 02:35:00-05:00',
//   '2024-04-27 03:29:00-05:00',
//   '2024-04-28 04:25:00-05:00',
//   '2024-04-29 05:24:00-05:00',
//   '2024-04-30 06:21:00-05:00',
//   '2024-05-01 07:17:00-05:00',
//   '2024-05-02 08:11:00-05:00',
//   '2024-05-03 09:02:00-05:00',
//   '2024-05-04 09:51:00-05:00',
//   '2024-05-05 10:41:00-05:00',
//   '2024-05-06 11:31:00-05:00',
//   '2024-05-07 12:24:00-05:00',
//   '2024-05-08 13:20:00-05:00',
//   '2024-05-09 14:19:00-05:00',
//   '2024-05-10 15:19:00-05:00',
//   '2024-05-11 16:18:00-05:00',
//   '2024-05-12 17:14:00-05:00',
//   '2024-05-13 18:06:00-05:00',
//   '2024-05-14 18:53:00-05:00',
//   '2024-05-15 19:36:00-05:00',
//   '2024-05-16 20:17:00-05:00',
//   '2024-05-17 20:56:00-05:00',
//   '2024-05-18 21:35:00-05:00',
//   '2024-05-19 22:15:00-05:00',
//   '2024-05-20 22:57:00-05:00',
//   '2024-05-21 23:41:00-05:00',
//   '2024-05-23 00:30:00-05:00',
//   '2024-05-24 01:22:00-05:00',
//   '2024-05-25 02:19:00-05:00',
//   '2024-05-26 03:18:00-05:00',
//   '2024-05-27 04:17:00-05:00',
//   '2024-05-28 05:13:00-05:00',
//   '2024-05-29 06:07:00-05:00',
//   '2024-05-30 06:58:00-05:00',
//   '2024-05-31 07:47:00-05:00',
//   '2024-06-01 08:35:00-05:00',
//   '2024-06-02 09:23:00-05:00',
//   '2024-06-03 10:14:00-05:00',
//   '2024-06-04 11:07:00-05:00',
//   '2024-06-05 12:04:00-05:00',
//   '2024-06-06 13:03:00-05:00',
//   '2024-06-07 14:03:00-05:00',
//   '2024-06-08 15:01:00-05:00',
//   '2024-06-09 15:55:00-05:00',
//   '2024-06-10 16:45:00-05:00',
//   '2024-06-11 17:31:00-05:00',
//   '2024-06-12 18:13:00-05:00',
//   '2024-06-13 18:53:00-05:00',
//   '2024-06-14 19:32:00-05:00',
//   '2024-06-15 20:11:00-05:00',
//   '2024-06-16 20:51:00-05:00',
//   '2024-06-17 21:34:00-05:00',
//   '2024-06-18 22:21:00-05:00',
//   '2024-06-19 23:12:00-05:00',
//   '2024-06-21 00:08:00-05:00',
//   '2024-06-22 01:07:00-05:00',
//   '2024-06-23 02:08:00-05:00',
//   '2024-06-24 03:07:00-05:00',
//   '2024-06-25 04:03:00-05:00',
//   '2024-06-26 04:55:00-05:00',
//   '2024-06-27 05:45:00-05:00',
//   '2024-06-28 06:33:00-05:00',
//   '2024-06-29 07:20:00-05:00',
//   '2024-06-30 08:09:00-05:00',
//   '2025-06-01 18:15:00-05:00',
//   '2025-06-02 18:58:00-05:00',
//   '2025-06-03 19:39:00-05:00',
//   '2025-06-04 20:19:00-05:00',
//   '2025-06-05 20:58:00-05:00',
//   '2025-06-06 21:39:00-05:00',
//   '2025-06-07 22:21:00-05:00',
//   '2025-06-08 23:07:00-05:00',
//   '2025-06-09 23:56:00-05:00',
//   '2025-06-11 00:47:00-05:00',
//   '2025-06-12 01:41:00-05:00',
//   '2025-06-13 02:35:00-05:00',
//   '2025-06-14 03:29:00-05:00',
//   '2025-06-15 04:20:00-05:00',
//   '2025-06-16 05:08:00-05:00',
//   '2025-06-17 05:55:00-05:00',
//   '2025-06-18 06:41:00-05:00',
//   '2025-06-19 07:28:00-05:00',
//   '2025-06-20 08:17:00-05:00',
//   '2025-06-21 09:09:00-05:00',
//   '2025-06-22 10:05:00-05:00',
//   '2025-06-23 11:07:00-05:00',
//   '2025-06-24 12:11:00-05:00',
//   '2025-06-25 13:16:00-05:00',
//   '2025-06-26 14:18:00-05:00',
//   '2025-06-27 15:15:00-05:00',
//   '2025-06-28 16:06:00-05:00',
//   '2025-06-29 16:52:00-05:00',
//   '2025-06-30 17:35:00-05:00',
//   '2027-08-01 12:20:00-05:00',
//   '2027-08-02 13:19:00-05:00',
//   '2027-08-03 14:14:00-05:00',
//   '2027-08-04 15:05:00-05:00',
//   '2027-08-05 15:55:00-05:00',
//   '2027-08-06 16:43:00-05:00',
//   '2027-08-07 17:32:00-05:00',
//   '2027-08-08 18:22:00-05:00',
//   '2027-08-09 19:13:00-05:00',
//   '2027-08-10 20:05:00-05:00',
//   '2027-08-11 20:57:00-05:00',
//   '2027-08-12 21:49:00-05:00',
//   '2027-08-13 22:39:00-05:00',
//   '2027-08-14 23:26:00-05:00',
//   '2027-08-16 00:11:00-05:00',
//   '2027-08-17 00:54:00-05:00',
//   '2027-08-18 01:35:00-05:00',
//   '2027-08-19 02:15:00-05:00',
//   '2027-08-20 02:56:00-05:00',
//   '2027-08-21 03:37:00-05:00',
//   '2027-08-22 04:21:00-05:00',
//   '2027-08-23 05:09:00-05:00',
//   '2027-08-24 06:00:00-05:00',
//   '2027-08-25 06:57:00-05:00',
//   '2027-08-26 07:57:00-05:00',
//   '2027-08-27 08:59:00-05:00',
//   '2027-08-28 10:01:00-05:00',
//   '2027-08-29 11:01:00-05:00',
//   '2027-08-30 11:57:00-05:00',
//   '2027-08-31 12:51:00-05:00',
// ];

const timesToCheck = [
  '2024-01-17 10:58:00-05:00',
  '2024-01-18 00:32:00-05:00',
];

for (const timeToCheck of timesToCheck) {
  const nyctime = moment(timeToCheck);
  const actual = timeInNycToMoontime(nyctime);
  console.log(`Time in solar time: ${timeToCheck} converts to moon time ${actual}`);
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