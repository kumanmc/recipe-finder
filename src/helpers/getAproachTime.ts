 /**
   * 
   * This function takes a string and returns the approximate time in hours and minutes.    
   * The idea is split by ' ' and when it finds hour or minute(and plural) it checks the previous word, 
   * if it is a number or a word that means 1 (a, an, one) then it adds to the total time. 
   * @param str text to search duration
  * @returns string with aprox duration.
  */
 export function getAproxTime(instructionsString: string): string {
    const noAproxTime = "No approximate time could be estimated";
    if (!instructionsString || typeof instructionsString !== 'string' || instructionsString.trim() === "") {
      return noAproxTime;
    }
  
    let totalMinutes = 0;
    const text = instructionsString.toLowerCase();
  
    const cleanedText = text
      .replace(/\r\n|\n|\r/g, ' ')
      .replace(/\s*-\s*/g, ' ')
      .replace(/[.,;()"“”!]/g, '');
  
    const words = cleanedText.split(/\s+/);
  
    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i].trim();
      if (currentWord === "") continue;
  
      let timeValue = 0;
      let unitMultiplier = 1;
  
      if (currentWord === "minute" || currentWord === "minutes") {
        unitMultiplier = 1;
      } else if (currentWord === "hour" || currentWord === "hours") {
        unitMultiplier = 60;
      } else {
        continue;
      }
  
      if (i > 0) {
        const potentialNumberWord = words[i - 1];
        const num = parseInt(potentialNumberWord, 10);
  
        if (!isNaN(num) && num > 0) {
          timeValue = num;
        } else if (potentialNumberWord === "a" || potentialNumberWord === "an" || potentialNumberWord === "one") {
          timeValue = 1;
        }
      }
      totalMinutes += timeValue * unitMultiplier;
    }
  
    if (totalMinutes === 0) {
      return noAproxTime;
    }
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    let resultParts = [];
    if (hours > 0) {
      resultParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
      resultParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }
  
    return `Approx. ${resultParts.join(' and ')}`;
  }
  