export function setFullDate(source, target) {
  target.setFullYear(source.getFullYear(), source.getMonth(), source.getDate());
}

export function setFullTime(source, target) {
  target.setMilliseconds(source.getMilliseconds());
  target.setSeconds(source.getSeconds());
  target.setMinutes(source.getMinutes());
  target.setHours(source.getHours());
}
