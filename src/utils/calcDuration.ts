export function calcDuration(duration: string, type: string) {
  const time = parseInt(duration);
  return type == "hours"
    ? time * 3600
    : type == "days"
    ? time * 86400
    : time * 2592000;
}

