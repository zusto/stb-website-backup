export function formatZohoDateTime(date: Date): string {
  // Get timezone offset
  const tzOffset = -date.getTimezoneOffset();
  const tzHours = Math.floor(Math.abs(tzOffset) / 60)
    .toString()
    .padStart(2, '0');
  const tzMinutes = (Math.abs(tzOffset) % 60).toString().padStart(2, '0');
  const tzSign = tzOffset >= 0 ? '+' : '-';

  // Format date parts
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Combine in ISO8601 format with timezone
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
}

// For date-only fields
export function formatZohoDate(dateStr: string): string {
  // Convert DD-MM-YYYY to YYYY-MM-DD
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}