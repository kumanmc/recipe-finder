import { getYouTubeEmbedUrl } from './getYouTubeEmbedUrl';

describe('getYouTubeEmbedUrl', () => {

  test('empty or null parameter', () => {
    expect(getYouTubeEmbedUrl('')).toBeNull();
    // @ts-ignore: Intentionally passing null to test the function
    expect(getYouTubeEmbedUrl(null)).toBeNull();
    // @ts-ignore: Intentionally passing undefined to test robustness
    expect(getYouTubeEmbedUrl(undefined)).toBeNull();
  })
  test('valid parameter', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  })

  // Test case 5: Valid short URL (youtu.be)
  test('should return correct embed URL for youtu.be URL', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 6: Valid embed URL (already in embed format, should still process correctly)
  test('should return correct embed URL for already embed format URL', () => {
    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 7: URL with extra parameters
  test('should return correct embed URL for URL with extra parameters', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KiL1J0eW9Kx3S2gXv2g_s_4g_1g_0';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 8: URL with start time
  test('should return correct embed URL for URL with start time', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 9: URL without 'www.'
  test('should return correct embed URL for URL without www.', () => {
    const url = 'https://youtube.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 10: URL with http (should still process, though output is https)
  test('should return correct embed URL for http URL', () => {
    const url = 'http://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 11: Invalid YouTube URL (no video ID)
  test('should return null for an invalid YouTube URL without video ID', () => {
    const url = 'https://www.youtube.com/user/somechannel';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });

  // Test case 12: Completely random string
  test('should return null for a random string', () => {
    const url = 'this is not a youtube url at all';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });

  // Test case 13: URL with a different domain
  test('should return null for a URL from a different domain', () => {
    const url = 'https://vimeo.com/123456789';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });

  // Test case 14: URL with a malformed video ID (too short/long)
  test('should return null for a malformed video ID', () => {
    const url = 'https://www.youtube.com/watch?v=shortID'; // less than 11 chars
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });

  // Test case 15: YouTube URL with /v/ format
  test('should return correct embed URL for /v/ format', () => {
    const url = 'https://www.youtube.com/v/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 16: YouTube URL with /e/ format
  test('should return correct embed URL for /e/ format', () => {
    const url = 'https://www.youtube.com/e/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  // Test case 17: YouTube URL with /user/ format (should fail as it's not a video)
  test('should return null for /user/ format (non-video URL)', () => {
    const url = 'https://www.youtube.com/user/TheOfficialQueenVideo';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });


});
