import React from "react";
import Row from "./row";
import { RowProps } from "./row";


/**
 * Props for the Grid component
 */
export interface GridProps {
  rows: RowProps[];
}

/**
 * Grid component
 */
const Grid: React.FC<GridProps> = ({ rows }) => {
  return (
    <div className="block items-center justify-center">
      {rows.map(
        (row, index) => (
          <Row
            key={index}
            rowIndex={index}
            letters={row.letters}
          />
        )
      )}
    </div>
  );
}

export default Grid;