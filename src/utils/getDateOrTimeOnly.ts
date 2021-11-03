export function getDateOnly(dateAndTime: string) {
  const [month, day] = dateAndTime.split(" ");
  return `${month} ${day}`;
}

export function getTimeOnly(dateAndTime: string) {
  return dateAndTime.split(" ")[1].substr(0, 5);
}
