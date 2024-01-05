export function calcDurationReverse(duration: string) {
  const seconds = parseInt(duration);
  const durationObject = {
    value: "",
    durationType: "",
  };

  if (seconds >= 2592000) {
    durationObject.value = Math.floor(seconds / 2592000).toString();
    durationObject.durationType = "months";
  } else if (seconds >= 86400) {
    durationObject.value = Math.floor(seconds / 86400).toString();
    durationObject.durationType = "days";
  } else {
    durationObject.value = Math.floor(seconds / 3600).toString();
    durationObject.durationType = "hours";
  }
  return durationObject;
}
