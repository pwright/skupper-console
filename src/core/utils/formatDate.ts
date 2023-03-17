import { startDateOffsetMap, timeIntervalMap } from 'API/Prometheus.constant';

export function formatDate(timestamp: number, start: number) {
  // one week ago
  if (start * 1000 <= Date.now() - startDateOffsetMap[timeIntervalMap.OneWeek] * 1000) {
    return getDayFromTimestamp(timestamp);
  }

  // 14 days ago
  if (start * 1000 <= Date.now() - startDateOffsetMap[timeIntervalMap.TwoWeeks] * 1000) {
    return getMonthAndDay(timestamp);
  }

  return getTimeFromTimestamp(timestamp);
}

function getTimeFromTimestamp(timestamp: number) {
  // Convert timestamp to milliseconds
  const milliseconds = timestamp * 1000;

  // Create a new Date object with the milliseconds
  const dateObject = new Date(milliseconds);
  // Use the Date object's getHours() method to get the hours
  const hours = dateObject.getHours();

  // Use the String object's padStart() method to add padding to the hours
  const paddedHours = hours.toString().padStart(2, '0');

  // Use the Date object's getMinutes() method to get the minutes
  const minutes = dateObject.getMinutes();

  // Use the String object's padStart() method to add padding to the minutes
  const paddedMinutes = minutes.toString().padStart(2, '0');

  // Return the padded hours and minutes as a string
  return `${paddedHours}:${paddedMinutes}`;
}

function getDayFromTimestamp(timestamp: number) {
  const timeString = getTimeFromTimestamp(timestamp);
  // Create a new Date object using the timestamp (in milliseconds)
  const date = new Date(timestamp * 1000);

  // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = date.getDay();

  // Define an array with the names of the days of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the name of the day of the week
  const dayOfWeekName = daysOfWeek[dayOfWeek];
  const day = date.getDate(); // get the day of the month

  // Return an object with the day of the week, number of days, hours, and minutes
  return `${dayOfWeekName} ${day} ${timeString}`;
}

function getMonthAndDay(timestamp: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp * 1000); // convert timestamp to milliseconds
  const monthIndex = date.getMonth(); // get the zero-based month index
  const month = months[monthIndex]; // get the month abbreviation from the array
  const day = date.getDate(); // get the day of the month

  return `${month} ${day}`;
}