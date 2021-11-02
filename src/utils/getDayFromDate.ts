const indexToDay = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

export function getDayFromDate(date: string) {
  const [day, month, year] = date.split("/");

  const indexDay = new Date(`${month}/${day}/${year}`).getDay();

  return indexToDay[indexDay];
}
