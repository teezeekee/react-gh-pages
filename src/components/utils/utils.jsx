
export const createUrlWithParams = (baseUrl, params) => {
  // Check if the base URL already contains a '?'
  const hasQueryParams = baseUrl.includes("?");
  const url = new URL(baseUrl);

  // Create URLSearchParams object from the existing query string if it exists
  const searchParams = new URLSearchParams(url.search);

  // Append the new params to the existing searchParams
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.set(key, params[key]); // Use 'set' to override if the key exists, or add if it doesn't
    }
  }

  // If baseUrl has no query params, append a '?', otherwise append '&'
  url.search = searchParams.toString();

  return url.toString();
};
