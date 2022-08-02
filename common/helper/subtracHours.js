exports.subtractHours = (numOfHours, date) => {
  date.setHours(date.getHours() - numOfHours);
  return date;
};
