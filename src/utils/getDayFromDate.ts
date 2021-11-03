const indexToDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export function getDayFromDate(date: string) {
  const year = new Date().getFullYear();
  const indexDay = new Date(`${date} ${year}`).getDay();

  return indexToDay[indexDay];
}
