import React from "react";
import styles from './letter.module.css'


/**
 * Props for the Letter component
 */
export interface LetterProps {
  column: number;
  character: string;
  status: 'correct' | 'wrong place' | 'incorrect' | 'not guessed';
  inRevealedRow: boolean;
}

/**
 * Letter component
 */
const Letter: React.FC<LetterProps> = ({ column, character, status, inRevealedRow }) => {
  const backgroundColor: string = `var(--letter-color-${status.replace(' ', '-')})`;
  const borderWidth: string = (status === 'not guessed' || inRevealedRow ? '2px' : '');
  const style = {
    '--initial-color': inRevealedRow ? 'var(--letter-color-not-guessed)' : backgroundColor,
    '--final-color': backgroundColor,
    borderWidth,
    animationDelay: `${column * 200}ms`
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={`w-[50] h-[50] m-[2.5px] flex items-center justify-center
                 uppercase font-bold text-[2rem] cursor-default
                 border-solid border border-[#3a3a3c] ${styles.letter}
                 ${inRevealedRow ? styles.rotating : ''}`}
    >
      {character}
    </div >
  );
}

export default Letter;