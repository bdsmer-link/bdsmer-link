import { format } from "date-fns";

function toZonedTime(date: Date, timezone: number = 8) {
  const offset = new Date().getTimezoneOffset();

  return new Date(date.getTime() + offset * 60 * 1000 + timezone * 3600 * 1000);
}

export default function formatInTaipei(date: Date, formatStr: string) {
  return format(toZonedTime(date), formatStr);
}
