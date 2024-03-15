type dateString = string;

export function formatDate(dateString: dateString): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
