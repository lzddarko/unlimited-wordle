import words from '../database/en.json';


/**
 * A constant array containing the list of words used in the game,
 * loaded from a simple JSON file
 */
export const WORDS: string[] = words;

/**
 * Random word from the list of available words, used as the solution
 */
export const SOLUTION: string = words[
  Math.floor(Math.random() * words.length)
];
