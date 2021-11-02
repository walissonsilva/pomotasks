export function getDateOnly(dateAndTime: string) {
  return dateAndTime.split(" ")[0];
}

export function getTimeOnly(dateAndTime: string) {
  return dateAndTime.split(" ")[1].substr(0, 5);
}
