export function getDateFromString(
  dateString: string,
  locale: string = "sv-SE"
): string {
  return new Date(dateString).toLocaleString(locale, {
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getOnlyDateFromString(
  dateString: string,
  locale: string = "sv-SE"
): string {
  if (!dateString) {
    return "";
  }
  return new Date(dateString).toLocaleString(locale, {
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function parseJsonString(str: any) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
