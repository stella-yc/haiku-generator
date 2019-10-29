var fs = require("fs");

/***
 * Methods
 */

//count the syllables in the given array of phonemes
// by counting the numbers
function countSyllables(phonemes) {
  let count = 0;
  phonemes.forEach(function(pho) {
    if (pho.match(/\d/)) {
      count++;
    }
  });
  return count;
}

// output is an object where the key is the number of syllables
// and the value is an array of all words that match
// const syllableMap = {
//   1: ['cat', 'dog', 'mouse'],
//   2: ['leopard', 'spider', 'baboon']
// }
function generateSyllableMap(data) {
  const lines = data.split("\n");
  return lines.reduce((syllableMap, line) => {
    const [word, ...phonemes] = line.split(" ");
    let count = 0;
    if (phonemes && phonemes.length) {
      count = countSyllables(phonemes);
    }
    if (syllableMap[count] === undefined) {
      syllableMap[count] = [word];
    } else {
      syllableMap[count].push(word);
    }
    return syllableMap;
  }, {});
}

function getWordWithNSyllables(syllableCount, syllableTable) {
  const matches = syllableTable[syllableCount];
  const ind = Math.floor(Math.random() * matches.length);
  return matches[ind];
}

//Make a haiku by following the given structure and looking
// up words in the syllableTable
function generateHaiku(haikuStructure, syllableTable) {
  const haiku = haikuStructure.map(lineStructure => {
    const haikuLine = lineStructure
      .map(wordStructure => {
        return getWordWithNSyllables(wordStructure, syllableTable);
      })
      .join(" ");
    return haikuLine;
  });
  return haiku.join("\n");
}

/***
 *  The magic starts here
 */

// Get text data and translate into a string
console.log("...generating syllable map...");
const rawData = fs.readFileSync("./cmudict.txt").toString();

// Format the raw data into an object keyed by number of syllables
const syllableMap = generateSyllableMap(rawData);
console.log("...syllable map generated!");
// Create a haiku given 2 parameters
// 1. An array describing the words per line, and number of syllables per word
// 2. The map of syllable counts and words based on the raw data
const getHaiku1 = () => generateHaiku([[2, 3], [1, 3, 3], [3, 2]], syllableMap);

console.log(getHaiku1());
