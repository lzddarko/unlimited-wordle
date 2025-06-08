import React from "react";


/**
 * Color mapping between the status of the letter and its color
 */
const COLORS: { [key: string]: string } = {
  'correct': '#538d4e',
  'wrong place': '#b59f3b',
  'incorrect': '#3a3a3c',
  'not guessed': 'black'
};

/**
 * Props for the Letter component
 */
export interface LetterProps {
  character: string;
  status: 'correct' | 'wrong place' | 'incorrect' | 'not guessed';
}

/**
 * Letter component
 */
const Letter: React.FC<LetterProps> = ({ character, status }) => {
  return (
    <div
      style={{
        borderWidth: status === 'not guessed' ? '2px' : '',
        backgroundColor: COLORS[status]
      }}
      className="w-[50] h-[50] m-[2.5px] flex items-center justify-center
                 uppercase font-bold text-[2rem] cursor-default
                 border-solid border border-[#3a3a3c]"
    >
      {character}
    </div >
  );
}

export default Letter;