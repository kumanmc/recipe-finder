/**
 * Returns true|false if it is a valid URL
 * @param str La cadena de entrada.
 * @returns La cadena con la primera letra en mayúscula.
 */
export function isValidURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}
