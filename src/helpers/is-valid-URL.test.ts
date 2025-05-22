import { isValidUrl } from "./is-valid-URL";

describe('is/valid/URL', () => {

  test('Wrong URL retiurns false', () => {
    expect(isValidUrl('pero pato gato')).toBe(false)
  });

  test('Good URL returns OK', () => {
    expect(isValidUrl('http://www.google.es')).toBe(true)
  });

})
