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

export function newAbortSignal(timeoutMs: number = 10 * 60 * 100000) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

export function imageToBase64(params: any) {
  const reader = new FileReader();
  reader.readAsDataURL(params);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
}
