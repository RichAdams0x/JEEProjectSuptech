export function getOrderTime(timestamp: any) {
  const creationDate = new Date(timestamp);
  if (!timestamp) {
    return '';
  }

  // Get the current date
  const currentDate = new Date();
  const currentDateInMilliSeconds = currentDate.getTime();

  // Convert the Firebase timestamp to a JavaScript date
  const postDateInMilliSeconds = creationDate.getTime();

  // Calculate the difference between the dates in milliseconds
  const difference = currentDateInMilliSeconds - postDateInMilliSeconds;

  // Calculate the number of seconds, minutes, hours, and days
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Determine the appropriate time unit and value
  let timeUnit, timeValue;
  if (seconds < 60) {
    timeUnit = 's';
    timeValue = seconds;
  } else if (minutes < 60) {
    timeUnit = 'min';
    timeValue = minutes;
  } else if (hours < 24) {
    timeUnit = 'h';
    timeValue = hours;
  } else if (days < 7) {
    timeUnit = ' day';
    timeValue = days;
  } else {
    const date = new Date(postDateInMilliSeconds); // Convert seconds to milliseconds
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Return the difference in the desired format
  return `Commandé il y'a ${timeValue}${timeUnit}`;
}
