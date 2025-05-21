/**
 * Returns true|false if it is a valid URL
 * @param str La cadena de entrada.
 * @returns true: valid| false:invalid
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}