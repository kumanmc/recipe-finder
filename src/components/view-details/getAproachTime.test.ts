import { getAproxTime } from './getAproachTime';

describe('getAproxTime', () => {

  it('Check scenarios', () => {

    expect(getAproxTime('')).toBe('No approximate time could be estimated');
    expect(getAproxTime('2 hours 1 hours 34 hour')).toBe('Approx. 37 hours');
    expect(getAproxTime('aaa 3-4 minutes nekfn ere 3-4 hours eee 3 9 minute'))
      .toBe('Approx. 4 hours and 13 minutes');
    expect(getAproxTime('bake for 1 hour')).toBe('Approx. 1 hour');
    expect(getAproxTime('wait a minute')).toBe('Approx. 1 minute');
    expect(getAproxTime('rest for 3 hours')).toBe('Approx. 3 hours');
    expect(getAproxTime('simmer for 30 minutes')).toBe('Approx. 30 minutes');
    expect(getAproxTime('This takes 1 hour and 25 minutes.')).toBe('Approx. 1 hour and 25 minutes');
    expect(getAproxTime('.,;()!')).toBe("No approximate time could be estimated");
    expect(getAproxTime('hour and 30 minutes')).toBe("Approx. 30 minutes");
  });

});
