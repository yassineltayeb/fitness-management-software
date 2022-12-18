export function toLocalDate(date: Date) {
  return new Date(Date.UTC(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate(),
    new Date(date).getHours(),
    new Date(date).getMinutes(),
  ));
}
