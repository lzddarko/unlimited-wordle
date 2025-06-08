import React from "react";
import Letter from "./letter";
import { LetterProps } from './letter'


/**
 * Props for the Row grid component
 */
export interface RowProps {
  rowIndex: number;
  letters: LetterProps[];
  isRevealed: boolean;
}

/**
 * Row grid component
 */
const Row: React.FC<RowProps> = ({ rowIndex, letters, isRevealed }) => {
  return (
    <div className="flex items-center justify-center">
      {letters.map(
        (letter, columnIndex) => (
          <Letter
            key={`${rowIndex}-${columnIndex}`}
            column={columnIndex}
            character={letter.character}
            status={letter.status}
            inRevealedRow={isRevealed}
          />
        )
      )}
    </div>
  );
}

export default Row;