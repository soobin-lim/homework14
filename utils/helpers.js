module.exports = {
  // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    console.log(date)
    // Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based value
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      // We add five years to the 'year' value to calculate the end date
      new Date(date).getFullYear()
    }`;
  }
};
