export function formatDate(date: string): string {
  const parsed = new Date(date);

  return new Intl.DateTimeFormat("nl-BE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
