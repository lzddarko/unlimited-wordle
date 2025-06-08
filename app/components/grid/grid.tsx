import React from "react";
import Row from "./row";
import { RowProps } from "./row";


/**
 * Props for the Grid component
 */
export interface GridProps {
  rows: RowProps[];
  revealedRow: number;
}

/**
 * Grid component
 */
const Grid: React.FC<GridProps> = ({ rows, revealedRow }) => {
  return (
    <div className="block items-center justify-center">
      {rows.map(
        (row, index) => (
          <Row
            key={index}
            rowIndex={index}
            letters={row.letters}
            isRevealed={index === revealedRow}
          />
        )
      )}
    </div>
  );
}

export default Grid;