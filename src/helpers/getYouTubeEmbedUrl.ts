  // Helper function to get the YouTube embed URL from a standard YouTube URL
  export const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    if (!youtubeUrl) {
      return null;
    }

    const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);

    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${videoIdMatch[1]}`;
    }

    return null;
  };