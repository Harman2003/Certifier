export function dateFormatter(milliseconds:string) {
  const date = new Date(milliseconds);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Ensure two digits for day and month
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Format: dd/mm/yyyy
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}
