import React from "react";
import Letter from "./letter";
import { LetterProps } from './letter'


/**
 * Props for the Row grid component
 */
export interface RowProps {
  rowIndex: number;
  letters: LetterProps[];
}

/**
 * Row grid component
 */
const Row: React.FC<RowProps> = ({ rowIndex, letters }) => {
  return (
    <div className="flex items-center justify-center">
      {letters.map(
        (letter, columnIndex) => (
          <Letter
            key={`${rowIndex}-${columnIndex}`}
            character={letter.character}
            status={letter.status}
          />
        )
      )}
    </div>
  );
}

export default Row;