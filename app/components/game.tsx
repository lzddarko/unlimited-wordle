'use client';


import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Grid from "./grid/grid";
import { RowProps } from "./grid/row";
import Keyboard from "./keyboard/keyboard";
import { WORDS, SOLUTION } from "../helpers/selector";


/**
 * Maximum allowed number of attempts
 */
const MAX_ATTEMPTS: number = 6;

/**
 * Initial value for the grid rows
 */
const INITIAL_ROWS: RowProps[] = Array(MAX_ATTEMPTS).fill({
  letters: [
    { character: '', status: 'not guessed' },
    { character: '', status: 'not guessed' },
    { character: '', status: 'not guessed' },
    { character: '', status: 'not guessed' },
    { character: '', status: 'not guessed' },
  ]
});

/**
 * Game component
 */
export default function Game() {
  // Keeps track of rows state (word guess attempts)
  const [rows, setRows] = useState(INITIAL_ROWS);

  // Keeps track of attempt count
  const [attempt, setAttempt] = useState(1);

  // Keeps track of the active row
  const [activeRow, setActiveRow] = useState(0);


  /**
   * Handles attempt checking
   */
  const handleGuess = (row: RowProps): void => {
    // Out of attempts
    if (attempt > MAX_ATTEMPTS) {
      return;
    }

    // Less than 5 letters
    const notFull = row.letters.some((letter) => letter.character === '');
    if (notFull) {
      toast.error('Row not full!');
      return;
    }

    const newRows = [...rows];
    const rowIndex = attempt - 1;
    const guess = row.letters.map((letter) => letter.character).join('');

    // Invalid word
    if (!WORDS.includes(guess)) {
      toast.error(`${guess.toUpperCase()} is not in the word list!`);
      setRows(newRows);
      setActiveRow(activeRow + 1);
      return;
    }

    // Word comparison
    for (const [colIndex, letter] of row.letters.entries()) {
      if (SOLUTION[colIndex] === letter.character) {
        newRows[rowIndex].letters[colIndex].status = 'correct';
      }
      else if (SOLUTION.includes(letter.character)) {
        newRows[rowIndex].letters[colIndex].status = 'wrong place';
      }
      else {
        newRows[rowIndex].letters[colIndex].status = 'incorrect';
      }
    }

    // Update grid and keyboard states
    setRows(newRows);
    setAttempt(attempt + 1);
    setActiveRow(activeRow + 1);

    const isSolved = row.letters.every((letter) => letter.status === 'correct');
    if (isSolved) {
      toast.success('You won');
      setAttempt(MAX_ATTEMPTS + 1);
      return;
    }

    // Out of attempts
    if (attempt >= MAX_ATTEMPTS) {
      toast.info(`Better luck next time. The word was "${SOLUTION.toUpperCase()}"`);
    }
  }

  /**
   * handles on-screen and physical keyboard key presses
   */
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement> | KeyboardEvent
  ): void => {
    if (attempt > MAX_ATTEMPTS) {
      return;
    }

    const label = e.type === 'click'
      ? (e.currentTarget as HTMLDivElement).textContent!
      : (e as KeyboardEvent).key.toLowerCase();

    const rowIndex = attempt - 1;
    const row = rows[rowIndex];

    // Submit guess
    if (label === 'enter') {
      return handleGuess(row);
    }

    const newRows = [...rows];

    // Delete last letter
    if (label === 'delete' || label === 'backspace') {
      const reversedLetters = [...row.letters].reverse();

      for (const letter of reversedLetters) {
        if (letter.character !== '') {
          letter.character = '';
          newRows[attempt - 1].letters = reversedLetters.reverse();
          setRows(newRows);
          break;
        }
      }

      return;
    }

    // new letter was entered, update grid rows
    for (const [rowIndex, row] of rows.entries()) {
      if (rowIndex !== attempt - 1) continue;

      const updatedLetters = [...row.letters];
      for (const [colIndex, letter] of updatedLetters.entries()) {
        if (letter.character === '') {
          updatedLetters[colIndex] = {
            character: label,
            status: 'not guessed'
          };

          newRows[rowIndex] = { ...row, letters: updatedLetters };
          setRows(newRows);
          return;
        }
      }
    }

  };

  useEffect(() => {
    // Physical keyboard key click handling
    const handleKeyDown = (event: KeyboardEvent) => {
      const allowedKeys = [
        ...'abcdefghijklmnopqrstuvwxyz'.split(''),
        'enter',
        'delete',
        'backspace'
      ];

      if (!allowedKeys.includes(event.key.toLowerCase())) {
        return;
      }

      handleClick(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rows, handleClick]);

  return (
    <div>
      <Grid rows={rows} />

      <Keyboard gridRows={rows} onClick={handleClick} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
}